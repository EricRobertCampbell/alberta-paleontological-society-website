import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_S4n-JgDR.mjs';
import 'kleur/colors';
import { g as getCollection } from '../chunks/_astro_content_CaQLvW2e.mjs';
import { a as filterAPSEvents } from '../chunks/filters_COM0xJYV.mjs';
import { s as sortEventsByDate } from '../chunks/eventSorting_Dce9o-KS.mjs';
import { $ as $$Layout } from '../chunks/Layout_Dz5yupWI.mjs';
import { $ as $$Event } from '../chunks/Event_BOItt7ao.mjs';
import { $ as $$HeadingWithBackground } from '../chunks/HeadingWithBackground_CsQAwjqL.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allEvents = await getCollection("events");
  const renderedEvents = await Promise.all(
    allEvents.map(async (event) => {
      const rendered = await event.render();
      return { ...rendered, slug: event.slug };
    })
  );
  const apsEvents = renderedEvents.filter((e) => filterAPSEvents({ host: e.remarkPluginFrontmatter.host }));
  const { upcomingEvents, pastEvents } = sortEventsByDate(apsEvents);
  const today = /* @__PURE__ */ new Date();
  const offset = today.getTimezoneOffset();
  const todayWithOffset = new Date(today.getTime() - offset * 60 * 1e3);
  const todayString = todayWithOffset.toISOString().split("T")[0];
  const todaysEvents = upcomingEvents.filter((event) => {
    const startDate = event.remarkPluginFrontmatter.startDate || (event.remarkPluginFrontmatter.start ? event.remarkPluginFrontmatter.start.split("T")[0] : "");
    const endDate = event.remarkPluginFrontmatter.endDate || (event.remarkPluginFrontmatter.end ? event.remarkPluginFrontmatter.end.split("T")[0] : startDate);
    return todayString >= startDate && todayString <= endDate;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Events", "data-astro-cid-oygtpqo5": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/assets/devilsCoulee.jpg", "backgroundPositionY": "33%", "data-astro-cid-oygtpqo5": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-oygtpqo5>Events</h1> ` })} <p data-astro-cid-oygtpqo5>
We hold a variety of events, from our monthly meetings, to lectures, to
		field trips all over Alberta!
</p> <p data-astro-cid-oygtpqo5>
Our monthly meetings are free and open to the public. They generally
		take place on the third Friday of each month. For more information, see
		the events below or visit the <a href="monthlymeetings" data-astro-cid-oygtpqo5>monthly meetings page.</a> </p> ${todaysEvents.length > 0 && renderTemplate`<section class="todays-events" data-astro-cid-oygtpqo5> <h2 data-astro-cid-oygtpqo5>Today's Events</h2> ${todaysEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-oygtpqo5": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-oygtpqo5": true })} ` })}`;
  })} </section>`}<h2 data-astro-cid-oygtpqo5>Upcoming Events</h2> ${upcomingEvents.length > 0 ? upcomingEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-oygtpqo5": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-oygtpqo5": true })} ` })}`;
  }) : renderTemplate`<p data-astro-cid-oygtpqo5>No upcoming events are currently scheduled. Check back soon!</p>`}${pastEvents.length > 0 && renderTemplate`<details open data-astro-cid-oygtpqo5> <summary data-astro-cid-oygtpqo5><h2 data-astro-cid-oygtpqo5>Past Events</h2></summary> ${pastEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-oygtpqo5": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-oygtpqo5": true })} ` })}`;
  })} </details>`}` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/index.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/index.astro";
const $$url = "/events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
