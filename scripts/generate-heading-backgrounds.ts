import sharp from 'sharp'
import { access, mkdir, readdir, stat } from 'fs/promises'
import { basename, extname, join } from 'path'
import { constants } from 'fs'
import {
    HEADING_BACKGROUND_CROPS,
    type HeadingBackgroundCrop,
} from './heading-backgrounds.config'

/**
 * Full-resolution source images. These are not served by the site.
 */
const SOURCE_DIR = 'originals/headingBackgrounds'

/**
 * Optimized strip derivatives written here and served as static assets.
 */
const OUTPUT_DIR = 'public/headingBackgrounds'

/**
 * Output strip size. Matches the heading band aspect (~1000×100 → 10:1)
 * at 2× resolution for retina desktops.
 */
const OUTPUT_WIDTH = 2000
const OUTPUT_HEIGHT = 200

/**
 * Encoding quality for WebP and JPEG outputs (0–100).
 * Kept moderate: these images show at ~30% opacity in a thin band.
 */
const QUALITY = 70

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|tiff?)$/i

type CropRect = {
    left: number
    top: number
    width: number
    height: number
}

/**
 * Generates strip-cropped WebP + JPEG heading backgrounds from originals.
 *
 * Crops use the same rules as CSS object-fit:cover + object-position, so the
 * baked strip matches what the old full-frame backgrounds showed.
 *
 * Usage:
 *   npx tsx scripts/generate-heading-backgrounds.ts
 *   npx tsx scripts/generate-heading-backgrounds.ts --force
 */
async function generateHeadingBackgrounds(): Promise<void> {
    const force = process.argv.includes('--force')

    try {
        await ensureDirectory(OUTPUT_DIR)
        console.log(`Scanning ${SOURCE_DIR}...\n`)

        const sourceById = await indexSourceImages(SOURCE_DIR)
        const outputIds = resolveOutputIds(sourceById)

        if (outputIds.length === 0) {
            console.log('No source images found.')
            return
        }

        let generatedCount = 0
        let skippedCount = 0

        for (const outputId of outputIds) {
            const crop = HEADING_BACKGROUND_CROPS[outputId] ?? {}
            const sourceId = crop.sourceId ?? outputId
            const sourcePath = sourceById.get(sourceId)

            if (!sourcePath) {
                console.error(
                    `✗ No original for "${outputId}" (expected ${sourceId}.* in ${SOURCE_DIR})`
                )
                continue
            }

            const result = await processSourceImage(
                outputId,
                sourcePath,
                crop,
                force
            )
            if (result === 'generated') {
                generatedCount++
            } else {
                skippedCount++
            }
        }

        warnAboutUnconfiguredSources(sourceById)

        console.log(
            `\nDone. Generated ${generatedCount} image(s); skipped ${skippedCount} existing.`
        )
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error)
        console.error('Error:', errorMessage)
        process.exit(1)
    }
}

/**
 * Indexes originals by file stem (id → absolute path).
 */
async function indexSourceImages(
    dirPath: string
): Promise<Map<string, string>> {
    const entries = await readdir(dirPath)
    const images = new Map<string, string>()

    for (const entry of entries) {
        const fullPath = join(dirPath, entry)
        const stats = await stat(fullPath)
        if (stats.isFile() && IMAGE_EXTENSIONS.test(entry)) {
            images.set(basename(entry, extname(entry)), fullPath)
        }
    }

    return images
}

/**
 * Output ids = configured crops plus any originals not yet in the config.
 */
function resolveOutputIds(sourceById: Map<string, string>): string[] {
    const ids = new Set<string>([
        ...Object.keys(HEADING_BACKGROUND_CROPS),
        ...sourceById.keys(),
    ])
    return [...ids].sort()
}

function warnAboutUnconfiguredSources(sourceById: Map<string, string>): void {
    const missing = [...sourceById.keys()].filter(
        (id) => !(id in HEADING_BACKGROUND_CROPS)
    )
    if (missing.length === 0) {
        return
    }
    console.log(
        `\nNote: using default 50%/50% crop for unconfigured originals:\n  ${missing.join(', ')}`
    )
}

/**
 * Creates strip-cropped WebP and JPEG derivatives for one background id.
 *
 * @returns 'generated' if at least one file was written, otherwise 'skipped'
 */
async function processSourceImage(
    outputId: string,
    sourcePath: string,
    crop: HeadingBackgroundCrop,
    force: boolean
): Promise<'generated' | 'skipped'> {
    const webpPath = join(OUTPUT_DIR, `${outputId}.webp`)
    const jpegPath = join(OUTPUT_DIR, `${outputId}.jpg`)

    const webpExists = await fileExists(webpPath)
    const jpegExists = await fileExists(jpegPath)

    if (!force && webpExists && jpegExists) {
        console.log(`✓ Already exists: ${outputId}.{webp,jpg}`)
        return 'skipped'
    }

    try {
        const positionX = crop.positionX ?? 50
        const positionY = crop.positionY ?? 50

        // Materialise EXIF orientation first so crop coords match the pixels we see.
        const { data: orientedBuffer, info } = await sharp(sourcePath)
            .rotate()
            .toBuffer({ resolveWithObject: true })

        const sourceWidth = info.width
        const sourceHeight = info.height

        if (!sourceWidth || !sourceHeight) {
            throw new Error('Could not read image dimensions')
        }

        const extract = computeCoverCropRect(
            sourceWidth,
            sourceHeight,
            OUTPUT_WIDTH / OUTPUT_HEIGHT,
            positionX,
            positionY
        )

        const pipeline = () =>
            sharp(orientedBuffer)
                .extract(extract)
                .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, { fit: 'fill' })

        if (force || !webpExists) {
            await pipeline().webp({ quality: QUALITY }).toFile(webpPath)
        }

        if (force || !jpegExists) {
            await pipeline()
                .jpeg({ quality: QUALITY, mozjpeg: true })
                .toFile(jpegPath)
        }

        const webpStat = await stat(webpPath)
        const jpegStat = await stat(jpegPath)
        console.log(
            `✓ ${outputId} @ ${positionX}% ${positionY}% → ${OUTPUT_WIDTH}×${OUTPUT_HEIGHT}: webp ${(webpStat.size / 1024).toFixed(0)} KB, jpg ${(jpegStat.size / 1024).toFixed(0)} KB`
        )
        return 'generated'
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error)
        console.error(`✗ Error processing ${outputId}:`, errorMessage)
        return 'skipped'
    }
}

/**
 * Crop window matching CSS object-fit:cover + object-position for a target
 * aspect ratio. Percentages place the same focal point as in CSS.
 */
function computeCoverCropRect(
    sourceWidth: number,
    sourceHeight: number,
    targetAspect: number,
    positionX: number,
    positionY: number
): CropRect {
    let width = sourceWidth
    let height = width / targetAspect

    if (height > sourceHeight) {
        height = sourceHeight
        width = height * targetAspect
    }

    const left = clamp(
        (sourceWidth - width) * (positionX / 100),
        0,
        Math.max(0, sourceWidth - width)
    )
    const top = clamp(
        (sourceHeight - height) * (positionY / 100),
        0,
        Math.max(0, sourceHeight - height)
    )

    // Sharp extract requires integer pixel values.
    const intLeft = Math.round(left)
    const intTop = Math.round(top)
    const intWidth = Math.min(Math.round(width), sourceWidth - intLeft)
    const intHeight = Math.min(Math.round(height), sourceHeight - intTop)

    return {
        left: intLeft,
        top: intTop,
        width: intWidth,
        height: intHeight,
    }
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

async function ensureDirectory(dirPath: string): Promise<void> {
    await mkdir(dirPath, { recursive: true })
}

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath, constants.F_OK)
        return true
    } catch {
        return false
    }
}

generateHeadingBackgrounds()
