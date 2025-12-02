import { g as getCollection } from '../../chunks/_astro_content_BoddU3be.mjs';
import { s as splitIsoString } from '../../chunks/dates_Cqnjqqwu.mjs';
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$FossilFridayContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FossilFridayContent;
  const { Content } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Content", Content, {})}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/FossilFridayContent.astro", void 0);

const GET = async ({ request }) => {
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
  const matchingEntry = allFossilFridays.find((entry) => {
    const entryParts = splitIsoString(entry.data.date);
    return entryParts.year === yearNum && entryParts.month === monthNum && entryParts.day === dayNum;
  });
  if (!matchingEntry) {
    return new Response(JSON.stringify(null), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600"
        // Cache for 1 hour
      }
    });
  }
  const rendered = await matchingEntry.render();
  console.log({ rendered });
  const contentResult = await $$FossilFridayContent.render({
    Content: rendered.Content
  });
  const contentHtml = contentResult.html;
  return new Response(
    JSON.stringify({
      title: matchingEntry.data.title,
      date: matchingEntry.data.date,
      images: matchingEntry.data.images,
      content: contentHtml
      // HTML string of the content
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
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
