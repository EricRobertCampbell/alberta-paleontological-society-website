import { g as getCollection } from '../../chunks/_astro_content_CaQLvW2e.mjs';
import { s as splitIsoString } from '../../chunks/dates_BDkwdIRj.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");
    const day = url.searchParams.get("day");
    if (!year || !month || !day) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameters: year, month, day"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);
    if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
      return new Response(
        JSON.stringify({
          error: "Invalid parameters: year, month, and day must be numbers"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const allFossilFridays = await getCollection("fossilFriday");
    const comparisons = allFossilFridays.map((entry) => {
      const entryParts = splitIsoString(entry.data.date);
      const isMatch = entryParts.year === yearNum && entryParts.month === monthNum && entryParts.day === dayNum;
      return {
        queryParams: {
          year: yearNum,
          month: monthNum,
          day: dayNum
        },
        entryDate: {
          original: entry.data.date,
          parsed: {
            year: entryParts.year,
            month: entryParts.month,
            day: entryParts.day
          }
        },
        match: isMatch
      };
    });
    const matchingEntry = allFossilFridays.find((entry) => {
      const entryParts = splitIsoString(entry.data.date);
      return entryParts.year === yearNum && entryParts.month === monthNum && entryParts.day === dayNum;
    });
    if (!matchingEntry) {
      return new Response(JSON.stringify({
        comparisons
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600"
          // Cache for 1 hour
        }
      });
    }
    return new Response(
      JSON.stringify({
        title: matchingEntry.data.title,
        date: matchingEntry.data.date,
        images: matchingEntry.data.images,
        comparisons
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600"
          // Cache for 1 hour
        }
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({
        error: errorMessage
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
