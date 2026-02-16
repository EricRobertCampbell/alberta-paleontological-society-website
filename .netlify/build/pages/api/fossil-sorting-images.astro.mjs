import { g as getCollection } from '../../chunks/_astro_content_CaQLvW2e.mjs';
import { e as extractReferenceId } from '../../chunks/functions_B7tnQCwS.mjs';
import { f as filterSpecimensByQuery } from '../../chunks/fossilSorting_DVHqzicT.mjs';
export { renderers } from '../../renderers.mjs';

const PAGE_SIZE = 20;
const CACHE_MAX_AGE_SECONDS = 60;
const extractImageIds = (imageRefs) => {
  return imageRefs.map((ref) => extractReferenceId(ref)).filter((id) => id !== null);
};
const resolveImages = (imageRefs, imageEntries) => {
  const imageMap = new Map(
    imageEntries.map((entry) => [entry.data.id, entry.data])
  );
  const imageIds = extractImageIds(imageRefs);
  return imageIds.map((id) => imageMap.get(id)).filter((img) => img !== void 0);
};
const sortSpecimens = (specimenEntries, imageEntries) => {
  return specimenEntries.map((entry) => {
    const specimen = entry.data;
    const resolvedImages = resolveImages(specimen.images, imageEntries);
    const firstImage = resolvedImages[0];
    return {
      id: specimen.id,
      date: specimen.date,
      description: specimen.description,
      finderCredit: specimen.finderCredit,
      tags: specimen.tags,
      thumbnailSrc: firstImage?.thumbnailSrc ?? "",
      src: firstImage?.src ?? "",
      images: resolvedImages
    };
  }).sort((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return a.id.localeCompare(b.id);
  });
};
const GET = async ({ request }) => {
  const allSpecimens = await getCollection("fossilSortingSpecimens");
  const allImages = await getCollection("fossilSortingImages");
  const sortedSpecimens = sortSpecimens(allSpecimens, allImages);
  const url = new URL(request.url);
  const afterId = url.searchParams.get("afterId");
  const q = url.searchParams.get("q");
  if (q && q.length > 0) {
    const filtered = filterSpecimensByQuery(sortedSpecimens, q);
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
    const index = sortedSpecimens.findIndex((specimen) => specimen.id === afterId);
    startIndex = index === -1 ? sortedSpecimens.length : index + 1;
  }
  const selectedSpecimens = sortedSpecimens.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );
  const lastReturned = selectedSpecimens[selectedSpecimens.length - 1];
  const hasMore = startIndex + PAGE_SIZE < sortedSpecimens.length;
  return new Response(
    JSON.stringify({
      images: selectedSpecimens,
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
