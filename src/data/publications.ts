export interface PublicationListing {
    slug: string
    title: string
    /** Public path of the static PDF, under /files/ so it does not hit the tracker. */
    filePath: string
    /** ISO date (YYYY-MM-DD), or null when a date has not been set. */
    publishedAt: string | null
}

/**
 * Interim catalog until publication rows live in the database.
 * /site-analytics reads this list. Download counts are not stored here.
 */
export const publications: PublicationListing[] = [
    {
        slug: 'test-book',
        title: 'Test Book',
        filePath: '/files/publications/test-book.pdf',
        publishedAt: null,
    },
]

export function trackedPublicationPath(slug: string): string {
    return `/publications/${slug}.pdf`
}
