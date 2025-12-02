import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { g as getCollection } from '../../chunks/_astro_content_BoddU3be.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const prerender = true;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allFossilFridays = await getCollection("fossilFriday");
  const sortedFossilFridays = [...allFossilFridays].sort((a, b) => {
    const dateA = a.data.date;
    const dateB = b.data.date;
    return dateB.localeCompare(dateA);
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Fossil Friday", "data-astro-cid-j5pnmpm7": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/tinyFossil1.jpg", "data-astro-cid-j5pnmpm7": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-j5pnmpm7>Fossil Friday</h1> ` })} <p data-astro-cid-j5pnmpm7>
Browse our collection of Fossil Friday posts, featuring fascinating fossil discoveries and specimens.
</p> <ul class="fossil-friday-list" data-astro-cid-j5pnmpm7> ${sortedFossilFridays.map((entry) => {
    entry.data.date.split("-");
    const dateSlug = entry.data.date;
    const displayDate = new Date(entry.data.date).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return renderTemplate`<li data-astro-cid-j5pnmpm7> <a${addAttribute(`/resources/fossilfriday/${dateSlug}`, "href")} class="fossil-friday-link" data-astro-cid-j5pnmpm7> <span class="fossil-friday-date" data-astro-cid-j5pnmpm7>${displayDate}</span> <span class="fossil-friday-title" data-astro-cid-j5pnmpm7> ${entry.data.title || "Fossil Friday"} </span> </a> </li>`;
  })} </ul> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/fossilfriday/index.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/fossilfriday/index.astro";
const $$url = "/resources/fossilfriday";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
