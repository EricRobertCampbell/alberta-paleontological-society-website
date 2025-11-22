/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * @param url - YouTube URL (can be null or undefined)
 * @returns Video ID or null if not a valid YouTube URL
 */
export function extractYouTubeVideoId(
    url: string | null | undefined
): string | null {
    if (!url) {
        return null
    }

    // Handle youtu.be short URLs (may have query params like ?t=123 or fragments like #t=123)
    const shortUrlMatch = url.match(
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&#]|$)/
    )
    if (shortUrlMatch) {
        return shortUrlMatch[1]
    }

    // Handle youtube.com/watch?v=VIDEO_ID (may have additional query params like &t=123&feature=share)
    const watchUrlMatch = url.match(
        /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})(?:[&#]|$)/
    )
    if (watchUrlMatch) {
        return watchUrlMatch[1]
    }

    // Handle youtube.com/embed/VIDEO_ID (may have query params like ?start=123)
    const embedUrlMatch = url.match(
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:[?&#]|$)/
    )
    if (embedUrlMatch) {
        return embedUrlMatch[1]
    }

    return null
}

/**
 * Converts a YouTube URL to an embed URL
 * @param url - YouTube URL (can be null or undefined)
 * @returns Embed URL or null if not a valid YouTube URL
 */
export function getYouTubeEmbedUrl(
    url: string | null | undefined
): string | null {
    const videoId = extractYouTubeVideoId(url)
    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}`
}
