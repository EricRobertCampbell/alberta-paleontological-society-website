import { g as getCollection } from '../../chunks/_astro_content_kjL--9gh.mjs';
export { renderers } from '../../renderers.mjs';

const PAGE_SIZE = 20;
const CACHE_MAX_AGE_SECONDS = 60;
const sortImages = (entries) => {
  return entries.map((entry) => entry.data).sort((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return a.id.localeCompare(b.id);
  });
};
const GET = async ({ request }) => {
  const allImages = await getCollection("fossilSortingImages");
  const sortedImages = sortImages(allImages);
  const url = new URL(request.url);
  const afterId = url.searchParams.get("afterId");
  const q = url.searchParams.get("q");
  if (q && q.length > 0) {
    const filtered = filterImagesByQuery(sortedImages, q);
    return new Response(
      JSON.stringify({
        images: filtered,
        hasMore: false,
        nextCursor: null
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `public, max-age=${CACHE_MAX_AGE_SECONDS}`
        }
      }
    );
  }
  let startIndex = 0;
  if (afterId) {
    const index = sortedImages.findIndex((image) => image.id === afterId);
    startIndex = index === -1 ? sortedImages.length : index + 1;
  }
  const selectedImages = sortedImages.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );
  const lastReturned = selectedImages[selectedImages.length - 1];
  const hasMore = startIndex + PAGE_SIZE < sortedImages.length;
  return new Response(
    JSON.stringify({
      images: selectedImages,
      hasMore,
      nextCursor: hasMore && lastReturned ? lastReturned.id : null
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE_SECONDS}`
      }
    }
  );
};
const filterImagesByQuery = (images, query) => {
  const q = query.toLowerCase().trim();
  if (!q) return images;
  return images.filter((image) => {
    const haystacks = [
      image.id ?? "",
      image.description ?? "",
      image.finderCredit ?? "",
      image.photoCredit ?? "",
      ...Array.isArray(image.tags) ? image.tags : []
    ].map((s) => String(s).toLowerCase());
    return haystacks.some((h) => h.includes(q));
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
