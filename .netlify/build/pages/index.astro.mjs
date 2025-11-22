import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, h as renderSlot, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { g as generateEventDateTimeString, a as getTodayString, s as splitIsoString, $ as $$Layout, b as $$SocialsLinks } from '../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$Event } from '../chunks/Event_t0gLdyHe.mjs';
import 'clsx';
/* empty css                                 */
import { g as getCollection } from '../chunks/_astro_content_kjL--9gh.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Announcement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Announcement;
  const { frontmatter, last } = Astro2.props;
  const { title, startDate, endDate } = frontmatter;
  generateEventDateTimeString(
    startDate);
  const containerClassList = ["container"];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(last ? [] : ["not-last"], "class:list")}${addAttribute(startDate, "data-startdate")}${addAttribute(endDate ? endDate : startDate, "data-enddate")} data-type="announcement" data-astro-cid-tmlihunq> <h3 class="event-title" data-astro-cid-tmlihunq>${title}</h3> <div${addAttribute(containerClassList, "class:list")} data-astro-cid-tmlihunq> <div class="content-container" data-astro-cid-tmlihunq> ${renderSlot($$result, $$slots["default"])} </div> </div> </section> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/Announcement.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const todayString = getTodayString();
  const now = /* @__PURE__ */ new Date();
  const allEvents = await getCollection("events");
  const renderedEvents = (await Promise.all(
    allEvents.map(async (event) => {
      const rendered = await event.render();
      return { ...rendered, slug: event.slug };
    })
  )).filter((e) => {
    if (e.remarkPluginFrontmatter.host && e.remarkPluginFrontmatter.host !== "APS") {
      return false;
    }
    if (e.remarkPluginFrontmatter.start) {
      return new Date(e.remarkPluginFrontmatter.start) >= now;
    }
    return e.remarkPluginFrontmatter.startDate >= todayString;
  }).sort((e1, e2) => {
    let dates2 = [e1, e2].map((e) => {
      if (e.remarkPluginFrontmatter.start) {
        return splitIsoString(e.remarkPluginFrontmatter.start).date;
      } else if (e.remarkPluginFrontmatter.startDate) {
        return e.remarkPluginFrontmatter.startDate;
      }
      return "";
    });
    const [firstDate, secondDate] = dates2;
    return secondDate.localeCompare(firstDate);
  });
  let nextEvent;
  if (renderedEvents.length > 0) {
    nextEvent = renderedEvents[renderedEvents.length - 1];
  }
  let dates = [];
  const allAnnouncements = (await getCollection("announcements")).filter(({ data }) => {
    let [year, month, day] = getTodayString().split("-");
    day = Number(day) + 2;
    let today;
    do {
      today = new Date([year, month, day].join("-"));
      day--;
    } while (!(day > 1 && today instanceof Date && isFinite(today)));
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    dates.push({
      getTodayString: getTodayString(),
      today,
      startDate,
      endDate,
      display: today >= startDate && today <= endDate
    });
    return today >= startDate && today <= endDate;
  }).sort((a1, a2) => {
    return new Date(a2.data.startDate).getTime() - new Date(a1.data.startDate).getTime();
  });
  const renderedAnnouncements = await Promise.all(
    allAnnouncements.map(async (announcement) => {
      return await announcement.render();
    })
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Alberta Palaeontological Society", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-j7pv25f6> <img${addAttribute("/assets/warner_1_low.jpg", "src")} id="initial-image" alt="APS members listening to a description of the Devil's Coulee fossil locality" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>
The Alberta Palaeontological Society (APS) is a non-profit
			organization founded in 1986. Our main goal is to promote the
			science of palaeontology through study and education. The APS makes
			important contributions to the field by discovering new findings and
			responsibly collecting, curating, and displaying significant fossil
			specimens. We are passionate about educating the general public,
			sharing knowledge about palaeontological discoveries, and fostering
			an appreciation for the ancient past.
</p> <p data-astro-cid-j7pv25f6>
Moreover, the society is committed to preserving palaeontological
			materials for the benefit of future generations. To achieve our
			mission, the APS actively collaborates with professional and
			academic communities, working together to safeguard and enhance the
			understanding of Alberta's rich cultural heritage.
</p> <p data-astro-cid-j7pv25f6>
The Alberta Palaeontological Society is a non-profit volunteer organization dedicated to spreading the
			wonders of palaeontology, ensuring that people of all ages can
			explore and appreciate the fascinating world of prehistoric life.
</p> <!-- <TodaysEvents /> --> ${renderedAnnouncements.length > 0 ? renderTemplate`<section data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Announcements</h2> ${renderedAnnouncements.map(
    (announcement, index, allAnnouncements2) => {
      const { Content, headings } = announcement;
      return renderTemplate`${renderComponent($$result2, "Announcement", $$Announcement, { "frontmatter": announcement.remarkPluginFrontmatter, "last": index === allAnnouncements2.length - 1, "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-j7pv25f6": true })} ` })}`;
    }
  )} </section>` : null} </section> ${nextEvent && renderTemplate`<section data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Next Event</h2> ${renderComponent($$result2, "Event", $$Event, { "frontmatter": nextEvent.remarkPluginFrontmatter, "last": true, "showPermalink": true, "slug": nextEvent.slug, "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "nextEvent.Content", nextEvent.Content, { "data-astro-cid-j7pv25f6": true })} ` })} <p data-astro-cid-j7pv25f6>
For more information, see our${" "} <a href="/events/" data-astro-cid-j7pv25f6>events page</a>.
</p> </section>`}<section data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Become a Member!</h3> <p data-astro-cid-j7pv25f6>
Become a member of the Alberta Palaeontological Society and unlock a
			world of palaeontological discovery. Engage with fellow enthusiasts,
			support fossil education, and gain exclusive access to field trips
			and resources that enrich your understanding of prehistoric life. <a href="/members/" data-astro-cid-j7pv25f6>
Join us today</a> and embark on a journey through time together.
</p> </section> <section data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>We're on social media!</h3> <p data-astro-cid-j7pv25f6>
Connect with us to get the latest news, pictures, and recordings of
			our presentations.
</p> ${renderComponent($$result2, "SocialsLinks", $$SocialsLinks, { "size": 2, "data-astro-cid-j7pv25f6": true })} </section> <section data-astro-cid-j7pv25f6> <div${addAttribute({
    display: "flex",
    flexDirection: "column"
  }, "style")} data-astro-cid-j7pv25f6> <h4${addAttribute({ textAlign: "center" }, "style")} data-astro-cid-j7pv25f6>APS Books for Sale</h4> <div id="book-pictures" data-astro-cid-j7pv25f6> <a class="reset-link-style" href="store#commonvertebratefossils" data-astro-cid-j7pv25f6> <img alt="Guide to Common Vertebrate Fossils from the Cretaceous of Albera" src="/guidetofossilssmall.jpg"${addAttribute({ marginRight: "8px" }, "style")} data-astro-cid-j7pv25f6> </a> </div> <p data-astro-cid-j7pv25f6>
Refer to the <a href="store" data-astro-cid-j7pv25f6>Store</a> link on this website for cost,
				how to purchase a copy and other details. These books will also be
				available for purchase at our monthly meetings.
</p> </div>${" "} </section> <section data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Privacy Policy</h2> <p data-astro-cid-j7pv25f6>
Please see our <a href="privacypolicy" data-astro-cid-j7pv25f6>Privacy Policy</a> for our policies
			regarding privacy, copyright, and liability.
</p> </section> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/index.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
