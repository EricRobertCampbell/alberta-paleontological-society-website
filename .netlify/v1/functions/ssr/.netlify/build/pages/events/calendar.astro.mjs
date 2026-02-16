import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent } from '../../chunks/astro/server_S4n-JgDR.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_Dz5yupWI.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_B0p_u66_.mjs';
import { $ as $$Event } from '../../chunks/Event_BOItt7ao.mjs';
import 'clsx';
/* empty css                                       */
import { $ as $$Button } from '../../chunks/Button_BdiizNxt.mjs';
import { g as getCollection } from '../../chunks/_astro_content_CaQLvW2e.mjs';
import { s as splitIsoString } from '../../chunks/dates_BDkwdIRj.mjs';
export { renderers } from '../../renderers.mjs';

const getEventTypeClass = (eventType) => {
  switch (eventType) {
    case "Monthly Meeting":
      return "event-monthly-meeting";
    case "Symposium":
      return "event-symposium";
    case "Field Trip":
      return "event-field-trip";
    case "Special Joint Meeting of the APS and the CSPG BASS Division":
      return "event-default";
    case "Fossil Sorting":
      return "event-fossil-sorting";
    case "External":
      return "event-external";
    default:
      return "event-default";
  }
};

const $$Astro$3 = createAstro();
const $$EventCalendarDayCell = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$EventCalendarDayCell;
  const { day, events } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="event-calendar-day-cell" data-astro-cid-omuxdvqt> <span class="day-number" data-astro-cid-omuxdvqt> ${day} </span> ${events.map((event) => {
    const { id, title } = event;
    const classes = ["event-title", getEventTypeClass(event.type)];
    const classAttr = classes.join(" ");
    if (id) {
      return renderTemplate`<a${addAttribute(`#${id}`, "href")}${addAttribute(["no-underline-effect", classAttr], "class:list")} data-astro-cid-omuxdvqt>${title}</a>`;
    }
    return renderTemplate`<div${addAttribute(classAttr, "class")} data-astro-cid-omuxdvqt>${event.title}</div>`;
  })} </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/EventCalendar/EventCalendarDayCell.astro", void 0);

const $$Astro$2 = createAstro();
const $$EventCalendarLegend = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$EventCalendarLegend;
  const { events } = Astro2.props;
  const eventTypes = Array.from(new Set(events.map((event) => event.type)));
  return renderTemplate`${eventTypes.length > 0 && renderTemplate`${maybeRenderHead()}<div class="event-calendar-legend" data-astro-cid-ugaamz3e><h2 data-astro-cid-ugaamz3e>
Legend
</h2><div class="event-calendar-item-container" data-astro-cid-ugaamz3e>${eventTypes.map((type) => renderTemplate`<div class="event-type" data-astro-cid-ugaamz3e><span${addAttribute(["event-type-icon", getEventTypeClass(type)], "class:list")} data-astro-cid-ugaamz3e></span><span class="event-type-label" data-astro-cid-ugaamz3e>${type}</span></div>`)}</div></div>`}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/EventCalendar/EventCalendarLegend.astro", void 0);

const $$Astro$1 = createAstro();
const $$EventCalendar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EventCalendar;
  const { month, year, events } = Astro2.props;
  function getDaysInMonth(year2, month2) {
    return new Date(year2, month2, 0).getDate();
  }
  function getExtraDays(year2, month2) {
    const firstDay = new Date(year2, month2 - 1, 1).getDay();
    return firstDay;
  }
  const monthDays = new Array(getDaysInMonth(year, month)).fill(0).map((_, index) => index + 1);
  const extraDays = Array.from({
    length: getExtraDays(year, month)
  }).fill("");
  const days = [...extraDays, ...monthDays];
  return renderTemplate`${maybeRenderHead()}<div class="event-calendar" data-astro-cid-egkij3jq> ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => renderTemplate`<span class="day-of-week" data-astro-cid-egkij3jq> ${day} </span>`)} ${days.map((day) => {
    const daysEvents = events.filter((event) => {
      if (!day) {
        return false;
      }
      const startDay = event.startDate.split("-")[2];
      const endDay = event.endDate.split("-")[2];
      return day >= parseInt(startDay) && day <= parseInt(endDay);
    });
    return renderTemplate`${renderComponent($$result, "EventCalendarDayCell", $$EventCalendarDayCell, { "day": day, "events": daysEvents, "data-astro-cid-egkij3jq": true })}`;
  })} </div> ${renderComponent($$result, "EventCalendarLegend", $$EventCalendarLegend, { "events": events, "data-astro-cid-egkij3jq": true })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/EventCalendar/EventCalendar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Calendar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Calendar;
  const validateYearString = (yearString) => {
    const year2 = parseInt(yearString, 10);
    return !Number.isNaN(year2) && Number.isFinite(year2);
  };
  const validateMonthString = (monthString) => {
    const month2 = parseInt(monthString, 10);
    return !Number.isNaN(month2) && Number.isFinite(month2) && month2 >= 1 && month2 <= 12;
  };
  function formatMonthYear(year2, month2) {
    const date = new Date(year2, month2 - 1);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  }
  const { url } = Astro2;
  const searchParams = new URLSearchParams(url.search);
  const now = /* @__PURE__ */ new Date();
  const defaultYear = now.getFullYear();
  const defaultMonth = now.getMonth() + 1;
  const rawYear = searchParams.get("year");
  const rawMonth = searchParams.get("month");
  const partial = searchParams.get("partial") === "true";
  const year = validateYearString(rawYear) ? rawYear : defaultYear.toString();
  const month = validateMonthString(rawMonth) ? rawMonth.padStart(2, "0") : defaultMonth.toString().padStart(2, "0");
  month === "12" ? "01" : (parseInt(month) + 1).toString().padStart(2, "0");
  month === "12" ? (parseInt(year) + 1).toString() : year;
  month === "01" ? "12" : (parseInt(month) - 1).toString().padStart(2, "0");
  month === "01" ? (parseInt(year) - 1).toString() : year;
  const allEvents = await getCollection("events");
  const filteredEvents = allEvents.filter((event) => {
    const { data } = event;
    if (data.start && data.end) {
      const { year: startYear, month: startMonth } = splitIsoString(data.start);
      const { year: endYear, month: endMonth } = splitIsoString(data.end);
      return startYear <= parseInt(year) && startMonth <= parseInt(month) && endYear >= parseInt(year) && endMonth >= parseInt(month);
    } else if (data.startDate) {
      const actualStartDate = data.startDate;
      const actualEndDate = data.endDate || actualStartDate;
      const [startYear, startMonth] = actualStartDate.split("-");
      const [endYear, endMonth] = actualEndDate.split("-");
      return startYear <= year && startMonth <= month && endYear >= year && endMonth >= month;
    }
  });
  const renderedEvents = await Promise.all(filteredEvents.sort((a, b) => {
    const dateA = a.data.start ? new Date(a.data.start) : a.data.startDate ? new Date(a.data.startDate) : null;
    const dateB = b.data.start ? new Date(b.data.start) : b.data.startDate ? new Date(b.data.startDate) : null;
    if (!dateA || !dateB) {
      return 0;
    }
    return dateA.getTime() - dateB.getTime();
  }).map(async (event) => {
    const rendered = await event.render();
    return {
      ...rendered,
      id: event.id
    };
  }));
  const calendarEvents = filteredEvents.map((event) => {
    let startDate;
    if (event.data.start) {
      startDate = splitIsoString(event.data.start).date;
    } else if (event.data.startDate) {
      startDate = event.data.startDate;
    } else {
      startDate = "";
    }
    let endDate;
    if (event.data.end) {
      endDate = splitIsoString(event.data.end).date;
    } else if (event.data.endDate) {
      endDate = event.data.endDate;
    } else {
      endDate = startDate;
    }
    const { title, type } = event.data;
    return {
      id: event.id,
      startDate,
      endDate,
      title,
      type
    };
  });
  return renderTemplate`${partial ? renderTemplate`${maybeRenderHead()}<div id="calendar-content" view-transition-name="event-calendar-content">${renderComponent($$result, "EventCalendar", $$EventCalendar, { "year": year, "month": month, "events": calendarEvents })}<hr class="post-event-calendar">${renderedEvents.map((event, index, allEvents2) => {
    const { Content, headings, id } = event;
    return renderTemplate`${renderComponent($$result, "Event", $$Event, { "id": id, "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1 }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Content", Content, {})}` })}`;
  })}</div>` : renderTemplate(_a || (_a = __template(["", `
<script>
  /**
 * Returns the full month name and year, e.g., "March 2025".
 * @param year - The full year (e.g., 2025)
 * @param month - The month number (1 for January, 12 for December)
 * @returns A string in the format "Month Year"
 */
function formatMonthYear(year, month) {
  const date = new Date(year, month - 1); // JS months are 0-indexed
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

document.getElementById('back-button').addEventListener('click', () => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const year = parseInt(searchParams.get('year') || new Date().getFullYear(), 10);
  const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1), 10);
  window.navigateToMonth(year, month - 1);

  const calendarHeader = document.getElementById('calendar-header-content');
  if (calendarHeader) {
    calendarHeader.textContent = formatMonthYear(year, month - 1);
  } else {
    console.error('Calendar header element not found');
  }
});
document.getElementById('next-button').addEventListener('click', () => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const year = parseInt(searchParams.get('year') || new Date().getFullYear(), 10);
  const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1), 10);
  window.navigateToMonth(year, month + 1);

  const calendarHeader = document.getElementById('calendar-header-content');
  if (calendarHeader) {
    calendarHeader.textContent = formatMonthYear(year, month + 1);
  } else {
    console.error('Calendar header element not found');
  }
});
<\/script>
<style>
  #calendar-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(2 * var(--theme-spacing-base));
  }
  .post-event-calendar {
  margin: calc(2 * var(--theme-spacing-base)) auto;
  border: none;
  border-top: 4px solid; /* or choose a specific color */
  width: 50%; /* or 100%, or any desired width */
  }
</style>`])), renderComponent($$result, "Layout", $$Layout, { "subtitle": "Calendar" }, { "default": ($$result2) => renderTemplate`<h1>Calendar</h1><p>This calendar brings together palaeontological events from around the region and beyond, including public lectures, field trips, conferences, and museum exhibitions. It’s a helpful resource for anyone interested in palaeontology, from amateur enthusiasts to professional researchers.</p><p>Events are listed to the best of our knowledge and are updated regularly. Whether you're looking to attend a fossil talk, join a dig, or simply stay informed about what's going on in the palaeo world, we hope you'll find something of interest.</p><p>If you know of an upcoming event that you think should be included, please feel free to contact us at ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "eric.campbell@albertapaleo.org", "subject": "Palaeontological event details / correction" })} with the details. I'd be happy to add it to the calendar!</p><div id="calendar-header" view-transition-name="event-calendar-content">${renderComponent($$result2, "Button", $$Button, { "type": "button", "id": "back-button" }, { "default": ($$result3) => renderTemplate`
&loarr; Back
` })}<h2 id="calendar-header-content">${formatMonthYear(parseInt(year), parseInt(month))}</h2>${renderComponent($$result2, "Button", $$Button, { "type": "button", "id": "next-button" }, { "default": ($$result3) => renderTemplate`
Next &roarr;
` })}</div><div id="calendar-content">${renderComponent($$result2, "EventCalendar", $$EventCalendar, { "year": year, "month": month, "events": calendarEvents })}<hr class="post-event-calendar">${renderedEvents.map((event, index, allEvents2) => {
    const { Content, headings, id } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "id": id, "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1 }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Content", Content, {})}` })}`;
  })}</div>` }))}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/calendar.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/calendar.astro";
const $$url = "/events/calendar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Calendar,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
