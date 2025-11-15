import type { APIRoute } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import type { FossilSortingImage } from '../../content/config'

const PAGE_SIZE = 20
const CACHE_MAX_AGE_SECONDS = 60

const sortImages = (
    entries: Array<CollectionEntry<'fossilSortingImages'>>
): Array<FossilSortingImage> => {
    return entries
        .map((entry) => entry.data)
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
    // // Artificial delay to test client-side loading states
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    // throw new Error('BANG!')
    const allImages = await getCollection('fossilSortingImages')
    const sortedImages = sortImages(allImages)

    const url = new URL(request.url)
    const afterId = url.searchParams.get('afterId')
    const q = url.searchParams.get('q')

    // Handle search query by filtering all images across id, description, credits, and tags.
    if (q && q.length > 0) {
        const filtered = filterImagesByQuery(sortedImages, q)

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
        const index = sortedImages.findIndex((image) => image.id === afterId)
        startIndex = index === -1 ? sortedImages.length : index + 1
    }

    const selectedImages = sortedImages.slice(
        startIndex,
        startIndex + PAGE_SIZE
    )
    const lastReturned = selectedImages[selectedImages.length - 1]
    const hasMore = startIndex + PAGE_SIZE < sortedImages.length

    return new Response(
        JSON.stringify({
            images: selectedImages,
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

const filterImagesByQuery = (
    images: Array<FossilSortingImage>,
    query: string
): Array<FossilSortingImage> => {
    const q = query.toLowerCase().trim()
    if (!q) return images

    return images.filter((image) => {
        const haystacks: Array<string> = [
            image.id ?? '',
            image.description ?? '',
            image.finderCredit ?? '',
            image.photoCredit ?? '',
            ...(Array.isArray(image.tags) ? image.tags : []),
        ].map((s) => String(s).toLowerCase())
        return haystacks.some((h) => h.includes(q))
    })
}
