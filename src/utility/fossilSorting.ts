/**
 * Type for a specimen with resolved images (used for filtering/searching)
 */
export type SpecimenWithImages = {
    id: string
    date: string
    description: string
    finderCredit: string
    tags: Array<string>
    thumbnailSrc: string
    src: string
    images: Array<{
        id: string
        src: string
        thumbnailSrc: string
        description: string
        credit: string
    }>
}

/**
 * Filters specimens by a search query.
 * Searches across id, description, finderCredit, tags, and image descriptions/credits.
 * 
 * @param specimens - Array of specimens to filter
 * @param query - Search query string
 * @returns Filtered array of specimens matching the query
 */
export function filterSpecimensByQuery<T extends SpecimenWithImages>(
    specimens: Array<T>,
    query: string
): Array<T> {
    if (!query) return specimens
    const q = query.toLowerCase().trim()
    if (!q) return specimens

    return specimens.filter((specimen) => {
        const haystacks: Array<string> = [
            specimen.id ?? '',
            specimen.description ?? '',
            specimen.finderCredit ?? '',
            ...(Array.isArray(specimen.tags) ? specimen.tags : []),
            // Also search in image descriptions and credits
            ...specimen.images.map((img) => img.description ?? ''),
            ...specimen.images.map((img) => img.credit ?? ''),
        ].map((s) => String(s).toLowerCase())
        return haystacks.some((h) => h.includes(q))
    })
}

