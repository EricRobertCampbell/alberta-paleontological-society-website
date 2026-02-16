import { g as getCollection } from '../../chunks/_astro_content_CaQLvW2e.mjs';
import { g as getStartDate, a as getEndDate } from '../../chunks/eventSorting_Dce9o-KS.mjs';
import { g as generateEventDateTimeString } from '../../chunks/functions_B7tnQCwS.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const startDate = url.searchParams.get("start_date");
    const endDate = url.searchParams.get("end_date");
    if (!startDate || !endDate) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameters: start_date and end_date (format: YYYY-MM-DD)"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return new Response(
        JSON.stringify({
          error: "Invalid date format. Dates must be in YYYY-MM-DD format"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    if (startDate > endDate) {
      return new Response(
        JSON.stringify({
          error: "start_date must be less than or equal to end_date"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const allEvents = await getCollection("events");
    const filteredEvents = allEvents.filter((event) => {
      const eventStartDate = getStartDate(event.data);
      const eventEndDate = getEndDate(event.data);
      if (!eventStartDate) {
        return false;
      }
      return eventStartDate <= endDate && eventEndDate >= startDate;
    });
    const sortedEvents = [...filteredEvents].sort((a, b) => {
      const dateA = getStartDate(a.data);
      const dateB = getStartDate(b.data);
      return dateA.localeCompare(dateB);
    });
    const eventsData = sortedEvents.map((event) => {
      const { title, subtitle, location, type, host, start, end, startDate: startDate2, endDate: endDate2 } = event.data;
      const dateString = generateEventDateTimeString({
        start,
        end,
        startDate: startDate2,
        endDate: endDate2
      });
      return {
        title,
        subtitle: subtitle || "",
        date: dateString,
        host: host || "Alberta Palaeontological Society",
        location: location || ""
      };
    });
    return new Response(
      JSON.stringify(eventsData),
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
