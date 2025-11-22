import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../../chunks/_astro_content_kjL--9gh.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$Event } from '../../../chunks/Event_t0gLdyHe.mjs';
import { g as getStartDate } from '../../../chunks/eventSorting_CLBN8lUW.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = true;
async function getStaticPaths() {
  const allEvents = await getCollection("events");
  const sortedEvents = [...allEvents].sort((a, b) => {
    const dateA = getStartDate(a.data);
    const dateB = getStartDate(b.data);
    return dateA.localeCompare(dateB);
  });
  return sortedEvents.map((event, index) => {
    const previousEvent = index > 0 ? sortedEvents[index - 1] : null;
    const nextEvent = index < sortedEvents.length - 1 ? sortedEvents[index + 1] : null;
    return {
      params: { slug: event.slug },
      props: {
        event,
        previousEvent: previousEvent ? { slug: previousEvent.slug, title: previousEvent.data.title } : null,
        nextEvent: nextEvent ? { slug: nextEvent.slug, title: nextEvent.data.title } : null
      }
    };
  });
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { event, previousEvent, nextEvent } = Astro2.props;
  const { Content } = await event.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": event.data.title, "data-astro-cid-kplmhwm6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="event-page-container" data-astro-cid-kplmhwm6> ${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.data, "last": true, "data-astro-cid-kplmhwm6": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-kplmhwm6": true })} ` })} <nav class="event-navigation" data-astro-cid-kplmhwm6> ${previousEvent ? renderTemplate`<a${addAttribute(`/events/stable/${previousEvent.slug}`, "href")} class="nav-button previous" data-astro-cid-kplmhwm6> <span class="nav-label" data-astro-cid-kplmhwm6>← Previous Event</span> <span class="nav-title" data-astro-cid-kplmhwm6>${previousEvent.title}</span> </a>` : renderTemplate`<div data-astro-cid-kplmhwm6></div>`} ${nextEvent ? renderTemplate`<a${addAttribute(`/events/stable/${nextEvent.slug}`, "href")} class="nav-button next" data-astro-cid-kplmhwm6> <span class="nav-label" data-astro-cid-kplmhwm6>Next Event →</span> <span class="nav-title" data-astro-cid-kplmhwm6>${nextEvent.title}</span> </a>` : renderTemplate`<div data-astro-cid-kplmhwm6></div>`} </nav> </div> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/stable/[slug].astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/stable/[slug].astro";
const $$url = "/events/stable/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	getStaticPaths,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
