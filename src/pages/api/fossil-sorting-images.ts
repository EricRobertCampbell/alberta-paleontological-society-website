import type { APIRoute } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import type { FossilSortingSpecimen, FossilSortingImage } from '../../content/config'
import { extractReferenceId } from '../../utility/functions'

const PAGE_SIZE = 20
const CACHE_MAX_AGE_SECONDS = 60

// Transform specimen to API format (with first image as thumbnail)
type SpecimenAPIFormat = {
    id: string
    date: string
    description: string
    finderCredit: string
    photoCredit: string
    tags: Array<string>
    thumbnailSrc: string
    src: string
    images: Array<{
        id: string
        src: string
        thumbnailSrc: string
        description: string
        photoCredit: string
    }>
}

// Helper to extract IDs from references (handles both strings and reference objects)
const extractImageIds = (
    imageRefs: Array<string | { id: string }>
): Array<string> => {
    return imageRefs
        .map((ref) => extractReferenceId(ref))
        .filter((id): id is string => id !== null)
}

// Helper to resolve image IDs to image objects
const resolveImages = (
    imageRefs: Array<string | { id: string }>,
    imageEntries: Array<CollectionEntry<'fossilSortingImages'>>
): Array<FossilSortingImage> => {
    const imageMap = new Map(
        imageEntries.map((entry) => [entry.data.id, entry.data])
    )
    const imageIds = extractImageIds(imageRefs)
    return imageIds
        .map((id) => imageMap.get(id))
        .filter((img): img is FossilSortingImage => img !== undefined)
}

const sortSpecimens = (
    specimenEntries: Array<CollectionEntry<'fossilSortingSpecimens'>>,
    imageEntries: Array<CollectionEntry<'fossilSortingImages'>>
): Array<SpecimenAPIFormat> => {
    return specimenEntries
        .map((entry) => {
            const specimen = entry.data
            const resolvedImages = resolveImages(specimen.images, imageEntries)
            const firstImage = resolvedImages[0]
            return {
                id: specimen.id,
                date: specimen.date,
                description: specimen.description,
                finderCredit: specimen.finderCredit,
                photoCredit: specimen.photoCredit,
                tags: specimen.tags,
                thumbnailSrc: firstImage?.thumbnailSrc ?? '',
                src: firstImage?.src ?? '',
                images: resolvedImages,
            }
        })
        .sort((a, b) => {
            const dateDiff =
                new Date(b.date).getTime() - new Date(a.date).getTime()
            if (dateDiff !== 0) {
                return dateDiff
            }
            return a.id.localeCompare(b.id)
        })
}

export const GET: APIRoute = async ({ request }) => {
    const allSpecimens = await getCollection('fossilSortingSpecimens')
    const allImages = await getCollection('fossilSortingImages')
    const sortedSpecimens = sortSpecimens(allSpecimens, allImages)

    const url = new URL(request.url)
    const afterId = url.searchParams.get('afterId')
    const q = url.searchParams.get('q')

    // Handle search query by filtering specimens across id, description, credits, tags, and image descriptions
    if (q && q.length > 0) {
        const filtered = filterSpecimensByQuery(sortedSpecimens, q)

        return new Response(
            JSON.stringify({
                images: filtered,
                hasMore: false,
                nextCursor: null,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': `public, max-age=${CACHE_MAX_AGE_SECONDS}`,
                },
            }
        )
    }

    let startIndex = 0

    if (afterId) {
        const index = sortedSpecimens.findIndex((specimen) => specimen.id === afterId)
        startIndex = index === -1 ? sortedSpecimens.length : index + 1
    }

    const selectedSpecimens = sortedSpecimens.slice(
        startIndex,
        startIndex + PAGE_SIZE
    )
    const lastReturned = selectedSpecimens[selectedSpecimens.length - 1]
    const hasMore = startIndex + PAGE_SIZE < sortedSpecimens.length

    return new Response(
        JSON.stringify({
            images: selectedSpecimens,
            hasMore,
            nextCursor: hasMore && lastReturned ? lastReturned.id : null,
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': `public, max-age=${CACHE_MAX_AGE_SECONDS}`,
            },
        }
    )
}

const filterSpecimensByQuery = (
    specimens: Array<SpecimenAPIFormat>,
    query: string
): Array<SpecimenAPIFormat> => {
    const q = query.toLowerCase().trim()
    if (!q) return specimens

    return specimens.filter((specimen) => {
        const haystacks: Array<string> = [
            specimen.id ?? '',
            specimen.description ?? '',
            specimen.finderCredit ?? '',
            specimen.photoCredit ?? '',
            ...(Array.isArray(specimen.tags) ? specimen.tags : []),
            // Also search in image descriptions and photo credits
            ...specimen.images.map((img) => img.description ?? ''),
            ...specimen.images.map((img) => img.photoCredit ?? ''),
        ].map((s) => String(s).toLowerCase())
        return haystacks.some((h) => h.includes(q))
    })
}
