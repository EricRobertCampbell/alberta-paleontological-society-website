import sharp from 'sharp'
import { readdir, access } from 'fs/promises'
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
 * Generates thumbnails for all images in the source directory.
 *
 * This function:
 * 1. Scans the source directory for image files (jpg, jpeg, png)
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
        // Read all files from the source directory
        const files = await readdir(SOURCE_DIR)

        // Filter to only include image files, excluding existing thumbnails
        const imageFiles = files.filter(
            (f: string) =>
                /\.(jpg|jpeg|png)$/i.test(f) && !f.includes('-thumbnail.')
        )

        if (imageFiles.length === 0) {
            console.log('No images found to process.')
            return
        }

        console.log(`Found ${imageFiles.length} image(s) to process...\n`)

        // Process each image file
        for (const file of imageFiles) {
            const inputPath = join(SOURCE_DIR, file)
            const ext = extname(file)
            const baseName = basename(file, ext)
            // Generate thumbnail filename: <original-name>-thumbnail.<ext>
            const outputPath = join(SOURCE_DIR, `${baseName}-thumbnail${ext}`)

            // Check if thumbnail already exists to avoid regenerating
            const exists = await fileExists(outputPath)
            if (exists) {
                console.log(`✓ Thumbnail already exists: ${file}`)
                continue
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
                    `✓ Created thumbnail: ${file} → ${basename(outputPath)}`
                )
            } catch (error) {
                // Log error but continue processing other images
                const errorMessage =
                    error instanceof Error ? error.message : String(error)
                console.error(`✗ Error processing ${file}:`, errorMessage)
            }
        }

        console.log('\nThumbnail generation complete!')
    } catch (error) {
        // Fatal error - cannot read source directory
        const errorMessage =
            error instanceof Error ? error.message : String(error)
        console.error('Error reading directory:', errorMessage)
        process.exit(1)
    }
}

generateThumbnails()
