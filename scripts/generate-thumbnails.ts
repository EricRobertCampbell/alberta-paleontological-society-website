import sharp from 'sharp'
import { readdir, access, stat } from 'fs/promises'
import { join, extname, basename } from 'path'
import { constants } from 'fs'

/**
 * Directory containing the source images to process.
 */
const SOURCE_DIR = 'public/fossil-sorting-images'

/**
 * Dimensions for generated thumbnails (width x height in pixels).
 * Thumbnails will be resized to fit these dimensions using 'cover' mode,
 * which maintains aspect ratio and crops to fill the entire area.
 */
const THUMBNAIL_SIZE: { width: number; height: number } = {
    width: 220,
    height: 180,
}

/**
 * Checks if a file exists at the given path.
 *
 * @param filePath - The file path to check
 * @returns Promise that resolves to true if the file exists, false otherwise
 */
async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath, constants.F_OK)
        return true
    } catch {
        return false
    }
}

/**
 * Processes a single image file to generate its thumbnail.
 *
 * @param inputPath - Full path to the source image
 * @param relativePath - Relative path from SOURCE_DIR (used for logging)
 */
async function processImageFile(
    inputPath: string,
    relativePath: string
): Promise<void> {
    const ext = extname(inputPath)
    const baseName = basename(inputPath, ext)
    const dir = join(inputPath, '..')
    // Generate thumbnail filename: <original-name>-thumbnail.<ext>
    const outputPath = join(dir, `${baseName}-thumbnail${ext}`)

    // Check if thumbnail already exists to avoid regenerating
    const exists = await fileExists(outputPath)
    if (exists) {
        console.log(`✓ Thumbnail already exists: ${relativePath}`)
        return
    }

    // Generate the thumbnail
    try {
        await sharp(inputPath)
            .resize(THUMBNAIL_SIZE.width, THUMBNAIL_SIZE.height, {
                fit: 'cover', // Maintain aspect ratio, crop to fill dimensions
                position: 'center', // Center the image before cropping
            })
            .toFile(outputPath)
        console.log(
            `✓ Created thumbnail: ${relativePath} → ${basename(outputPath)}`
        )
    } catch (error) {
        // Log error but continue processing other images
        const errorMessage =
            error instanceof Error ? error.message : String(error)
        console.error(`✗ Error processing ${relativePath}:`, errorMessage)
    }
}

/**
 * Recursively processes a directory to find and process image files.
 *
 * @param dirPath - Full path to the directory to process
 * @param relativePath - Relative path from SOURCE_DIR (used for logging)
 * @returns Promise that resolves to the number of images processed
 */
async function processDirectory(
    dirPath: string,
    relativePath: string = ''
): Promise<number> {
    let processedCount = 0

    try {
        const entries = await readdir(dirPath)

        for (const entry of entries) {
            const fullPath = join(dirPath, entry)
            const entryRelativePath = relativePath
                ? join(relativePath, entry)
                : entry

            try {
                const stats = await stat(fullPath)

                if (stats.isDirectory()) {
                    // Recursively process subdirectories
                    const subCount = await processDirectory(
                        fullPath,
                        entryRelativePath
                    )
                    processedCount += subCount
                } else if (stats.isFile()) {
                    // Process image files, excluding existing thumbnails
                    if (
                        /\.(jpg|jpeg|png)$/i.test(entry) &&
                        !entry.includes('-thumbnail.')
                    ) {
                        await processImageFile(fullPath, entryRelativePath)
                        processedCount++
                    }
                }
            } catch (error) {
                // Log error but continue processing other entries
                const errorMessage =
                    error instanceof Error ? error.message : String(error)
                console.error(
                    `✗ Error accessing ${entryRelativePath}:`,
                    errorMessage
                )
            }
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error)
        throw new Error(`Error reading directory ${relativePath || dirPath}: ${errorMessage}`)
    }

    return processedCount
}

/**
 * Generates thumbnails for all images in the source directory and its subdirectories.
 *
 * This function:
 * 1. Recursively scans the source directory and all subdirectories for image files (jpg, jpeg, png)
 * 2. Skips files that already have thumbnails (contain '-thumbnail' in filename)
 * 3. Checks if a thumbnail already exists before creating a new one
 * 4. Creates thumbnails with the format: `<original-name>-thumbnail.<ext>`
 * 5. Saves thumbnails in the same directory as the source images
 *
 * Thumbnails are resized to THUMBNAIL_SIZE dimensions using 'cover' fit mode,
 * which maintains aspect ratio and centers the image before cropping.
 *
 * @throws Exits the process with code 1 if the source directory cannot be read
 */
async function generateThumbnails(): Promise<void> {
    try {
        console.log(`Scanning ${SOURCE_DIR} and subdirectories...\n`)

        const processedCount = await processDirectory(SOURCE_DIR)

        if (processedCount === 0) {
            console.log('No images found to process.')
            return
        }

        console.log(`\nProcessed ${processedCount} image(s).`)
        console.log('Thumbnail generation complete!')
    } catch (error) {
        // Fatal error - cannot read source directory
        const errorMessage =
            error instanceof Error ? error.message : String(error)
        console.error('Error:', errorMessage)
        process.exit(1)
    }
}

generateThumbnails()
