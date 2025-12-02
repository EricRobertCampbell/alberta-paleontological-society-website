import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_BoddU3be.mjs';
import { a as filterAPSEvents } from '../../chunks/filters_3oDKp2dR.mjs';
import { s as sortEventsByDate } from '../../chunks/eventSorting_CLBN8lUW.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_BIFLqf3C.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { $ as $$Event } from '../../chunks/Event_CvC2GvxC.mjs';
import { r as roles } from '../../chunks/constants_gZothmyh.mjs';
export { renderers } from '../../renderers.mjs';

const $$Monthlymeetings = createComponent(async ($$result, $$props, $$slots) => {
  const allEvents = await getCollection("events");
  const renderedEvents = await Promise.all(
    allEvents.map(async (event) => {
      const rendered = await event.render();
      return { ...rendered, slug: event.slug };
    })
  );
  const monthlyMeetingEvents = renderedEvents.filter((e) => {
    const isApsEvents = filterAPSEvents({ host: e.remarkPluginFrontmatter.host });
    if (!isApsEvents) {
      return false;
    }
    return e.remarkPluginFrontmatter.type === "Monthly Meeting";
  });
  const { upcomingEvents } = sortEventsByDate(monthlyMeetingEvents);
  const { programCoordinator } = roles;
  if (!programCoordinator) {
    throw new Error("Unable to find program coordinator role!");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Monthly Meetings" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/assets/devilsCouleeMuseum.jpg", "backgroundPositionY": "37%" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>Monthly Meetings</h1> ` })} <p>
Monthly seminars and meetings are open to the public and generally occur
		on the third Friday of each month.
</p> <p>
If you would like to receive emails about upcoming events or further
		information about the scheduled events, contact ${programCoordinator.name}${programCoordinator.email && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` at ${renderComponent($$result3, "EmailLink", $$EmailLink, { "email": programCoordinator.email })}` })}`}.
</p> <p>
Monthly meetings are held in room B108 in Mount Royal University, as
		shown on <a href="/level 1 map.pdf" target="_blank">this map</a>. Our
		room is shown with a red dot.
</p> <p> <a href="https://www.mtroyal.ca/AboutMountRoyal/TransportationParking/_pdfs/Campus-Parking-Map.pdf" target="_blank" rel="noopener">University Lincoln Park Campus General Maps</a> </p>
If you use the East Entrance (on the 1st level), turn right immediately
	after you enter through the revolving door. If you use the West Entrance (on
	the 2nd level) descend the steps to the lower floor and proceed to the end
	of the long hall and turn left into B wing.
<p> <a href="https://www.mtroyal.ca/AboutMountRoyal/TransportationParking/_pdfs/Campus-Parking-Map.pdf" target="_blank" rel="noopener">Parking map - Lincoln Park Campus, Mount Royal University</a> </p> ${upcomingEvents.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <h2>Upcoming Meeting${upcomingEvents.length > 1 ? "s" : ""}</h2> ${upcomingEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result3, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Content", Content, {})} ` })}`;
  })}` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <h2>Upcoming Meetings</h2> <p>No upcoming monthly meetings are currently scheduled. Check back soon for new dates!</p> ` })}`}` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/monthlymeetings.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/monthlymeetings.astro";
const $$url = "/events/monthlymeetings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Monthlymeetings,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
