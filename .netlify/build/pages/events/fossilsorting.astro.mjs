import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_BoddU3be.mjs';
import { f as filterExternalEvents } from '../../chunks/filters_3oDKp2dR.mjs';
import { s as sortEventsByDate } from '../../chunks/eventSorting_CLBN8lUW.mjs';
import { e as extractReferenceId } from '../../chunks/functions_UiSr9xwT.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_BIFLqf3C.mjs';
import { $ as $$PhoneLink } from '../../chunks/PhoneLink_BkR0mjPD.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { $ as $$Event } from '../../chunks/Event_CvC2GvxC.mjs';
import { $ as $$Alert } from '../../chunks/Alert_C8qNr_ez.mjs';
import { r as roles } from '../../chunks/constants_gZothmyh.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { giftShop } = roles;
  const fossilSortingSpecimens = await getCollection("fossilSortingSpecimens");
  const fossilSortingImages = await getCollection("fossilSortingImages");
  const imageMap = new Map(
    fossilSortingImages.map((entry) => [entry.data.id, entry.data])
  );
  const randomSpecimenEntry = fossilSortingSpecimens[Math.floor(Math.random() * fossilSortingSpecimens.length)];
  console.log({ randomSpecimenEntry });
  const randomSpecimen = randomSpecimenEntry?.data;
  console.log({ randomSpecimen });
  const firstImageRef = randomSpecimen?.images?.[0];
  console.log({ firstImageRef });
  const firstImageId = firstImageRef ? extractReferenceId(firstImageRef) : null;
  console.log({ firstImageId });
  const randomImage = firstImageId ? imageMap.get(firstImageId) : void 0;
  console.log({ randomImage });
  function formatDateString(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }
  const allEvents = await getCollection("events");
  const renderedEvents = await Promise.all(
    allEvents.map(async (event) => {
      const rendered = await event.render();
      return { ...rendered, slug: event.slug };
    })
  );
  const fossilSortingEvents = renderedEvents.filter((e) => {
    const isExternal = filterExternalEvents({ host: e.remarkPluginFrontmatter.host });
    if (isExternal) {
      return false;
    }
    return e.remarkPluginFrontmatter.type === "Fossil Sorting";
  });
  const { upcomingEvents, pastEvents } = sortEventsByDate(fossilSortingEvents);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Fossil Sorting Sessions", "data-astro-cid-azt24f46": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/events/2025/fishSkull.jpeg", "backgroundPositionY": "50%", "data-astro-cid-azt24f46": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-azt24f46>Fossil Sorting Sessions</h1> ` })} <p data-astro-cid-azt24f46>
Join us for exciting microfossil sorting sessions where you can help advance paleontological research while discovering tiny treasures from millions of years ago! These sessions are open to anyone interested in getting involved in palaeontology and provide a unique opportunity to work with microscopes and contribute to ongoing scientific research.
</p> ${randomImage && randomSpecimen && renderTemplate`<section class="random-fossil" data-astro-cid-azt24f46> <h2 data-astro-cid-azt24f46>Featured Discovery</h2> <div class="random-fossil__content" data-astro-cid-azt24f46> <img${addAttribute(randomImage.src, "src")}${addAttribute(randomSpecimen.description, "alt")} class="random-fossil__image" loading="lazy" data-astro-cid-azt24f46> <div class="random-fossil__details" data-astro-cid-azt24f46> <p class="random-fossil__description" data-astro-cid-azt24f46>${randomSpecimen.description}</p> <p class="random-fossil__date" data-astro-cid-azt24f46><strong data-astro-cid-azt24f46>Date:</strong> ${formatDateString(randomSpecimen.date)}</p> <p class="random-fossil__credits" data-astro-cid-azt24f46> <strong data-astro-cid-azt24f46>Finder:</strong> ${randomSpecimen.finderCredit}<br data-astro-cid-azt24f46> <strong data-astro-cid-azt24f46>Photo:</strong> ${randomImage.photoCredit} </p> </div> </div> </section>`}<p data-astro-cid-azt24f46>
Curious what else our volunteers have been uncovering lately? Visit the <a href="/events/fossilsorting/images/" data-astro-cid-azt24f46>Fossil Sorting image gallery</a> to see highlights from recent sessions.
</p> <section data-astro-cid-azt24f46> <h2 data-astro-cid-azt24f46>About Our Fossil Sorting Sessions</h2> <p data-astro-cid-azt24f46>
Our microfossil sorting sessions are collaborative research activities where volunteers use microscopes to search for tiny fossils that aid the ongoing research of <a href="https://profiles.ucalgary.ca/jessica-theodor" target="_blank" data-astro-cid-azt24f46>Dr. Jessica Theodor</a> and <a href="https://profiles.ucalgary.ca/alex-dutchak" target="_blank" data-astro-cid-azt24f46>Dr. Alex Dutchak</a> at the University of Calgary. We examine matrix (soil) from various geological formations, including the Saskatchewan Cypress Hills Formation from the Middle Eocene period (about 50 million years old).
</p> <p data-astro-cid-azt24f46>
These sessions take place at Mount Royal University room B140 , where we have access to high-quality microscopes and laboratory facilities. The work contributes directly to ongoing paleontological research, and all fossils found are kept by the University of Calgary for their research collection.
</p> <h3 data-astro-cid-azt24f46>What to Expect</h3> <ul data-astro-cid-azt24f46> <li data-astro-cid-azt24f46>Use microscopes to examine sediment samples</li> <li data-astro-cid-azt24f46>Learn to identify microfossils from experienced volunteers</li> <li data-astro-cid-azt24f46>Contribute to real scientific research at the University of Calgary</li> <li data-astro-cid-azt24f46>Work in a friendly, supportive environment with other fossil enthusiasts</li> <li data-astro-cid-azt24f46>Discover fossils that are millions of years old</li> </ul> <h3 data-astro-cid-azt24f46>What to Bring</h3> <ul data-astro-cid-azt24f46> <li data-astro-cid-azt24f46>Tweezers or a small paint brush for picking tiny fossils</li> <li data-astro-cid-azt24f46>A pen to label your finds</li> <li data-astro-cid-azt24f46>Enthusiasm and patience for detailed work</li> </ul> <h3 data-astro-cid-azt24f46>Requirements and Guidelines</h3> <ul data-astro-cid-azt24f46> <li data-astro-cid-azt24f46><strong data-astro-cid-azt24f46>Age Restriction:</strong> Due to the delicate nature of this work, only participants 12 years and older are allowed</li> <li data-astro-cid-azt24f46><strong data-astro-cid-azt24f46>Experience:</strong> No prior experience is required - we welcome beginners!</li> <li data-astro-cid-azt24f46><strong data-astro-cid-azt24f46>Registration:</strong> While registration is not required, we recommend contacting our coordinator to confirm attendance</li> <li data-astro-cid-azt24f46><strong data-astro-cid-azt24f46>Research Contribution:</strong> All fossils found will be kept by the University of Calgary for their research</li> </ul> <h3 data-astro-cid-azt24f46>Location</h3> <p data-astro-cid-azt24f46>
Sessions are held at <strong data-astro-cid-azt24f46>Mount Royal University</strong> in their laboratory facilities. Room locations are specified for each session. Maps and parking information are available on the Mount Royal University website.
</p> <p data-astro-cid-azt24f46>
We are very grateful to Mount Royal University for allowing us to use their microscopes and laboratory facilities for these important research activities.
</p> </section> <h2 data-astro-cid-azt24f46>Registration and Contact</h2> <p data-astro-cid-azt24f46>
While registration is not required for fossil sorting sessions, we recommend letting our coordinator know if you're planning to attend. This helps us inform participants if we need to cancel a session due to unforeseen circumstances.
</p> <p data-astro-cid-azt24f46>
Contact ${giftShop.name}, our Fossil Sorting Coordinator${renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-azt24f46": true }, { "default": ($$result3) => renderTemplate` by e-mail at ${renderComponent($$result3, "EmailLink", $$EmailLink, { "email": giftShop.email, "subject": "Fossil Sorting Session", "data-astro-cid-azt24f46": true })}` })}`}${giftShop.telephone && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-azt24f46": true }, { "default": ($$result3) => renderTemplate` or phone at ${renderComponent($$result3, "PhoneLink", $$PhoneLink, { "number": giftShop.telephone, "data-astro-cid-azt24f46": true })}` })}`}.
</p> <h2 data-astro-cid-azt24f46>Data and Statistics</h2> ${renderComponent($$result2, "Alert", $$Alert, { "data-astro-cid-azt24f46": true }, { "default": ($$result3) => renderTemplate` <p data-astro-cid-azt24f46>
Are you disappointed by the lack of graphs or statistics on this page? You're in luck! Check out some of our <a href="/events/fossilsorting/data/" data-astro-cid-azt24f46>statistics and data visualizations</a>.
</p> <p data-astro-cid-azt24f46>
Prefer pictures instead? Explore the <a href="/events/fossilsorting/images/" data-astro-cid-azt24f46>Fossil Sorting image gallery</a> for recent highlights.
</p> ` })} <h2 data-astro-cid-azt24f46>Upcoming Fossil Sorting Sessions</h2> ${upcomingEvents.length > 0 ? upcomingEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-azt24f46": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-azt24f46": true })} ` })}`;
  }) : renderTemplate`<p data-astro-cid-azt24f46>No upcoming fossil sorting sessions are currently scheduled. Check back soon for new dates!</p>`}${pastEvents.length > 0 && renderTemplate`<details data-astro-cid-azt24f46> <summary data-astro-cid-azt24f46><h2 data-astro-cid-azt24f46>Past Fossil Sorting Sessions</h2></summary> ${pastEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-azt24f46": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-azt24f46": true })} ` })}`;
  })} </details>`}` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fossilsorting/index.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fossilsorting/index.astro";
const $$url = "/events/fossilsorting";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
