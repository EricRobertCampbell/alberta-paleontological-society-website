import { it, expect, describe } from 'vitest'
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '../youtube'

describe('extractYouTubeVideoId', () => {
    const testCases = [
        // Standard watch URLs
        {
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            expected: 'dQw4w9WgXcQ',
            description: 'standard watch URL',
        },
        {
            url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
            expected: 'dQw4w9WgXcQ',
            description: 'watch URL without www',
        },
        {
            url: 'http://www.youtube.com/watch?v=dQw4w9WgXcQ',
            expected: 'dQw4w9WgXcQ',
            description: 'watch URL with http',
        },

        // Watch URLs with query parameters
        {
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=123',
            expected: 'dQw4w9WgXcQ',
            description: 'watch URL with time parameter',
        },
        {
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=share&t=123',
            expected: 'dQw4w9WgXcQ',
            description: 'watch URL with multiple query parameters',
        },
        {
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ#t=123',
            expected: 'dQw4w9WgXcQ',
            description: 'watch URL with fragment',
        },

        // Short URLs (youtu.be)
        {
            url: 'https://youtu.be/dQw4w9WgXcQ',
            expected: 'dQw4w9WgXcQ',
            description: 'standard short URL',
        },
        {
            url: 'http://youtu.be/dQw4w9WgXcQ',
            expected: 'dQw4w9WgXcQ',
            description: 'short URL with http',
        },
        {
            url: 'https://youtu.be/dQw4w9WgXcQ?t=123',
            expected: 'dQw4w9WgXcQ',
            description: 'short URL with query parameter',
        },
        {
            url: 'https://youtu.be/dQw4w9WgXcQ#t=123',
            expected: 'dQw4w9WgXcQ',
            description: 'short URL with fragment',
        },
        {
            url: 'https://youtu.be/dQw4w9WgXcQ?feature=share&t=123',
            expected: 'dQw4w9WgXcQ',
            description: 'short URL with multiple query parameters',
        },

        // Embed URLs
        {
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            expected: 'dQw4w9WgXcQ',
            description: 'standard embed URL',
        },
        {
            url: 'https://youtube.com/embed/dQw4w9WgXcQ',
            expected: 'dQw4w9WgXcQ',
            description: 'embed URL without www',
        },
        {
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=123',
            expected: 'dQw4w9WgXcQ',
            description: 'embed URL with query parameter',
        },
        {
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ#t=123',
            expected: 'dQw4w9WgXcQ',
            description: 'embed URL with fragment',
        },

        // Video IDs with underscores and hyphens
        {
            url: 'https://www.youtube.com/watch?v=abc123_-XYZ',
            expected: 'abc123_-XYZ',
            description: 'video ID with underscores and hyphens',
        },

        // Invalid URLs
        {
            url: 'https://www.youtube.com/watch',
            expected: null,
            description: 'watch URL without video ID',
        },
        {
            url: 'https://www.youtube.com/watch?v=',
            expected: null,
            description: 'watch URL with empty video ID',
        },
        {
            url: 'https://youtu.be/',
            expected: null,
            description: 'short URL without video ID',
        },
        {
            url: 'https://www.youtube.com/watch?v=short',
            expected: null,
            description: 'video ID too short',
        },
        {
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQtoolong',
            expected: null,
            description: 'video ID too long',
        },
        {
            url: 'https://example.com/video',
            expected: null,
            description: 'non-YouTube URL',
        },
        {
            url: 'not a url',
            expected: null,
            description: 'invalid string',
        },
        {
            url: '',
            expected: null,
            description: 'empty string',
        },
    ]

    it.each(testCases)(
        'should extract video ID from $description: $url',
        ({ url, expected }) => {
            const result = extractYouTubeVideoId(url)
            expect(result).toBe(expected)
        }
    )

    it('should return null for null input', () => {
        expect(extractYouTubeVideoId(null)).toBe(null)
    })

    it('should return null for undefined input', () => {
        expect(extractYouTubeVideoId(undefined)).toBe(null)
    })
})

describe('getYouTubeEmbedUrl', () => {
    const testCases = [
        {
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            expected: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'standard watch URL',
        },
        {
            url: 'https://youtu.be/dQw4w9WgXcQ',
            expected: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'short URL',
        },
        {
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            expected: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'embed URL',
        },
        {
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=123',
            expected: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'watch URL with query parameters',
        },
        {
            url: 'https://youtu.be/dQw4w9WgXcQ?t=123',
            expected: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'short URL with query parameters',
        },
        {
            url: 'https://example.com/video',
            expected: null,
            description: 'invalid URL',
        },
        {
            url: '',
            expected: null,
            description: 'empty string',
        },
    ]

    it.each(testCases)(
        'should convert $description to embed URL',
        ({ url, expected }) => {
            const result = getYouTubeEmbedUrl(url)
            expect(result).toBe(expected)
        }
    )

    it('should return null for null input', () => {
        expect(getYouTubeEmbedUrl(null)).toBe(null)
    })

    it('should return null for undefined input', () => {
        expect(getYouTubeEmbedUrl(undefined)).toBe(null)
    })
})
