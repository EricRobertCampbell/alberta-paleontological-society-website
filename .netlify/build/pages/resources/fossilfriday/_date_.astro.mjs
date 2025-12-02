import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, d as addAttribute, m as maybeRenderHead } from '../../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../../chunks/_astro_content_BoddU3be.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = true;
async function getStaticPaths() {
  const allFossilFridays = await getCollection("fossilFriday");
  const sortedFossilFridays = [...allFossilFridays].sort((a, b) => {
    return a.data.date.localeCompare(b.data.date);
  });
  return sortedFossilFridays.map((entry, index) => {
    const dateSlug = entry.data.date;
    const previousEntry = index > 0 ? sortedFossilFridays[index - 1] : null;
    const nextEntry = index < sortedFossilFridays.length - 1 ? sortedFossilFridays[index + 1] : null;
    return {
      params: { date: dateSlug },
      props: {
        entry,
        previousEntry: previousEntry ? { date: previousEntry.data.date, title: previousEntry.data.title || "Fossil Friday" } : null,
        nextEntry: nextEntry ? { date: nextEntry.data.date, title: nextEntry.data.title || "Fossil Friday" } : null
      }
    };
  });
}
const $$date = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$date;
  const { entry, previousEntry, nextEntry } = Astro2.props;
  const { Content } = await entry.render();
  const displayDate = new Date(entry.data.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": entry.data.title || "Fossil Friday", "data-astro-cid-aoqdxt2q": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/tinyFossil1.jpg", "data-astro-cid-aoqdxt2q": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-aoqdxt2q>Fossil Friday</h1> ` })} <div class="fossil-friday-page-container" data-astro-cid-aoqdxt2q> <article class="fossil-friday-post" data-astro-cid-aoqdxt2q> <header class="fossil-friday-header" data-astro-cid-aoqdxt2q> <h2 data-astro-cid-aoqdxt2q>${entry.data.title || "Fossil Friday"}</h2> <time${addAttribute(entry.data.date, "datetime")} class="fossil-friday-date" data-astro-cid-aoqdxt2q> ${displayDate} </time> </header> <div${addAttribute(`images-container ${entry.data.images.length === 1 ? "single-image" : ""}`, "class")} data-astro-cid-aoqdxt2q> ${entry.data.images.map((image) => renderTemplate`<figure class="fossil-image" data-astro-cid-aoqdxt2q> <img${addAttribute(image.src, "src")}${addAttribute(image.description, "alt")} data-astro-cid-aoqdxt2q> <figcaption data-astro-cid-aoqdxt2q> <p class="image-description" data-astro-cid-aoqdxt2q>${image.description}</p> <p class="image-credit" data-astro-cid-aoqdxt2q>Credit: ${image.credit}</p> </figcaption> </figure>`)} </div> <div class="content-container" data-astro-cid-aoqdxt2q> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-aoqdxt2q": true })} </div> </article> <nav class="fossil-friday-navigation" data-astro-cid-aoqdxt2q> ${previousEntry ? renderTemplate`<a${addAttribute(`/resources/fossilfriday/${previousEntry.date}`, "href")} class="nav-button previous" data-astro-cid-aoqdxt2q> <span class="nav-label" data-astro-cid-aoqdxt2q>← Previous Fossil Friday</span> <span class="nav-title" data-astro-cid-aoqdxt2q>${previousEntry.title}</span> </a>` : renderTemplate`<button class="nav-button previous" disabled data-astro-cid-aoqdxt2q> <span class="nav-label" data-astro-cid-aoqdxt2q>← Previous Fossil Friday</span> <span class="nav-title" data-astro-cid-aoqdxt2q>None</span> </button>`} ${nextEntry ? renderTemplate`<a${addAttribute(`/resources/fossilfriday/${nextEntry.date}`, "href")} class="nav-button next" data-astro-cid-aoqdxt2q> <span class="nav-label" data-astro-cid-aoqdxt2q>Next Fossil Friday →</span> <span class="nav-title" data-astro-cid-aoqdxt2q>${nextEntry.title}</span> </a>` : renderTemplate`<button class="nav-button next" disabled data-astro-cid-aoqdxt2q> <span class="nav-label" data-astro-cid-aoqdxt2q>Next Fossil Friday →</span> <span class="nav-title" data-astro-cid-aoqdxt2q>None</span> </button>`} </nav> </div> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/fossilfriday/[date].astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/fossilfriday/[date].astro";
const $$url = "/resources/fossilfriday/[date]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$date,
	file: $$file,
	getStaticPaths,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
