/**
 * Public id used in URLs and API stable paths.
 * Legacy content collections expose this as `slug`; Content Layer uses `id`.
 */
export function contentEntryPublicId(entry: {
    id: string
    slug?: string
}): string {
    return entry.slug ?? entry.id
}
