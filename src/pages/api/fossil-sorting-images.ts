import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import type { FossilSortingImage } from "../../content/config";

const PAGE_SIZE = 20;
const CACHE_MAX_AGE_SECONDS = 60;

const sortImages = (entries: CollectionEntry<"fossilSortingImages">[]): FossilSortingImage[] => {
	return entries
		.map((entry) => entry.data)
		.sort((a, b) => {
			const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
			if (dateDiff !== 0) {
				return dateDiff;
			}
			return a.id.localeCompare(b.id);
		});
};

export const GET: APIRoute = async ({ request }) => {
	const allImages = await getCollection("fossilSortingImages");
	const sortedImages = sortImages(allImages);

	const url = new URL(request.url);
	const afterId = url.searchParams.get("afterId");

	let startIndex = 0;

	if (afterId) {
		const index = sortedImages.findIndex((image) => image.id === afterId);
		startIndex = index === -1 ? sortedImages.length : index + 1;
	}

	const selectedImages = sortedImages.slice(startIndex, startIndex + PAGE_SIZE);
	const lastReturned = selectedImages[selectedImages.length - 1];
	const hasMore = startIndex + PAGE_SIZE < sortedImages.length;

	return new Response(
		JSON.stringify({
			images: selectedImages,
			hasMore,
			nextCursor: hasMore && lastReturned ? lastReturned.id : null,
		}),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": `public, max-age=${CACHE_MAX_AGE_SECONDS}`,
			},
		},
	);
};

