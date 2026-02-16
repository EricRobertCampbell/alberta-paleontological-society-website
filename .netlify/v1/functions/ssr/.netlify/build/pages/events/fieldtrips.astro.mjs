import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment } from '../../chunks/astro/server_S4n-JgDR.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_CaQLvW2e.mjs';
import { f as filterExternalEvents } from '../../chunks/filters_COM0xJYV.mjs';
import { s as sortEventsByDate } from '../../chunks/eventSorting_Dce9o-KS.mjs';
import { $ as $$Layout } from '../../chunks/Layout_Dz5yupWI.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_B0p_u66_.mjs';
import { $ as $$PhoneLink } from '../../chunks/PhoneLink_Dcp3Hk3R.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CsQAwjqL.mjs';
import { $ as $$Event } from '../../chunks/Event_BOItt7ao.mjs';
import { r as roles } from '../../chunks/constants_qEDz4jHW.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$Fieldtrips = createComponent(async ($$result, $$props, $$slots) => {
  const { fieldTripCoordinator } = roles;
  const CURRENT_YEAR = "2026";
  const allEvents = await getCollection("events");
  const renderedEvents = await Promise.all(
    allEvents.map(async (event) => {
      const rendered = await event.render();
      return { ...rendered, slug: event.slug };
    })
  );
  const fieldTripEvents = renderedEvents.filter((e) => {
    const isExternal = filterExternalEvents({ host: e.remarkPluginFrontmatter.host });
    if (isExternal) {
      return false;
    }
    return e.remarkPluginFrontmatter.type === "Field Trip";
  });
  const { upcomingEvents, pastEvents } = sortEventsByDate(fieldTripEvents);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Field Trips", "data-astro-cid-fhgsxkhy": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/assets/knudsensFarmIntro.jpg", "backgroundPositionY": "30%", "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-fhgsxkhy>Field Trips</h1> ` })} <p data-astro-cid-fhgsxkhy>Field trips are at the heart of the Alberta Palaeontological Society. There’s nothing quite like getting out onto the landscape to see where fossils are found and to better understand the ancient worlds they come from. We're incredibly lucky to live in a province surrounded by world-class palaeontological treasures, from sweeping badlands to marine deposits and Ice Age sites.</p> <p data-astro-cid-fhgsxkhy>Whether you're brand new to fossils or a seasoned collector, we invite you to join us in the field. Come explore Alberta’s deep past with us. Check out the trips below and sign up for your next adventure!</p> <h2 data-astro-cid-fhgsxkhy>Registration and Payment</h2> <p data-astro-cid-fhgsxkhy>
To register for a field trip, print off and fill out the <a href="/fieldTrips/2026/registration-fillable.pdf" data-astro-cid-fhgsxkhy>sign up sheet</a>, then follow the instructions there.
</p> <p data-astro-cid-fhgsxkhy>
Continuing from previous years, you will be able to pay field trip fees by
		Interac E-transfer (Canada only). Follow directions on your bank’s
		online banking site or mobile app. Bank fees may apply. Payee is
${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "giftshop@albertapaleo.org", "subject": `Field Trip Fees for ${CURRENT_YEAR}`, "data-astro-cid-fhgsxkhy": true })}. Please state in the message field: "Field Trip Fees for ${CURRENT_YEAR}". Email
		a scan or photo of the completed registration form to
${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "giftshop@albertapaleo.org", "data-astro-cid-fhgsxkhy": true })}.
</p> <h2 data-astro-cid-fhgsxkhy>Upcoming Field Trips</h2> ${upcomingEvents.length > 0 ? upcomingEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-fhgsxkhy": true })} ` })}`;
  }) : renderTemplate`<p data-astro-cid-fhgsxkhy>No upcoming field trips are currently scheduled. Check back soon for new dates!</p>`}<section data-astro-cid-fhgsxkhy> <h2 data-astro-cid-fhgsxkhy>
Forms
</h2> <ul class="field-trip-forms-list" data-astro-cid-fhgsxkhy> <li data-astro-cid-fhgsxkhy> <a href="/fieldTrips/2026/registration-fillable.pdf" data-astro-cid-fhgsxkhy>${CURRENT_YEAR} Registration Form</a> </li> <li data-astro-cid-fhgsxkhy> <a href="/fieldTrips/2026/forms/APS_Adult_Waiver.pdf" data-astro-cid-fhgsxkhy>
Adult Waiver
</a> </li> <li data-astro-cid-fhgsxkhy> <a href="/fieldTrips/2026/forms/APS_Minor_Waiver.pdf" data-astro-cid-fhgsxkhy>
Minor Waiver
</a> </li> <li data-astro-cid-fhgsxkhy> <a href="/fieldTrips/2026/forms/APS_ER_ContactMedInfo.pdf" data-astro-cid-fhgsxkhy>
Medical and Emergency Contact Information
</a> </li> </ul> </section> <h2 data-astro-cid-fhgsxkhy>Field Trip Terms</h2> <p data-astro-cid-fhgsxkhy>Field trips are open to members only!</p> <p data-astro-cid-fhgsxkhy>
All fees are due at the time of registration. Fees for trips are generally, $10.00, although please check the individual trip.
		Non-members and unaccompanied minors will not be allowed to attend field
		trips. All participants are required to have their membership in good
		standing. Any membership applications received after May 1, ${CURRENT_YEAR} will
		not be reviewed and voted on by the Board of Directors until September,
${CURRENT_YEAR}. Therefore, if you are a non-member and would like to join be sure
		your application is received prior to May 1, ${CURRENT_YEAR}. All participants will
		be required to read and sign a release form (waiver). Detailed
		information will be provided to all those registered shortly after the
		registration deadline. After the registration deadline no refunds will
		be given; however, you will receive the guide for the trip.
		Registrations are accepted on a first come first served basis so sign up
		early to avoid disappointment. For the ${CURRENT_YEAR} field trips ${fieldTripCoordinator.name} will be
		sending you the waiver and medical forms along with the trip
		information. This information will be sent to you via email. Please ensure that your email address is correct and legible when
		sending in registration forms. When you arrive at the meeting place
		please have all forms completed. All participants are required to have
		fully completed all waiver and medical forms in order to attend the
		trip. There will be no exceptions. All personal information is held in
		confidence and ultimately destroyed.
</p> <h2 data-astro-cid-fhgsxkhy>Trip Participant Responsibilities</h2> <ul data-astro-cid-fhgsxkhy> <li data-astro-cid-fhgsxkhy>
It is understood that risk is inherent to some degree in outdoor
			activities. Before registering for a trip please ensure you
			understand the risks involved and are prepared to accept them.
</li> <li data-astro-cid-fhgsxkhy>
As a participant you are responsible for your own safety and
			equipment at all times
</li> <li data-astro-cid-fhgsxkhy>
Inform the trip leader of any medical conditions they should be
			aware of in an emergency
</li> <li data-astro-cid-fhgsxkhy>
Ensure that your previous experience, ability and fitness level are
			adequate for the trip
</li> </ul> <h2 data-astro-cid-fhgsxkhy>Important Safety Information</h2> <p data-astro-cid-fhgsxkhy>
The APS is concerned about the safety of its members during our field
		tip outings. Safety protocol requires that the SAFETY GUIDELINES must be
		communicated to and understood by those attending. You will be asked to
		sign our waiver as proof of your understanding of these SAFETY
		GUIDELINES.
</p> <h2 data-astro-cid-fhgsxkhy>Questions?</h2> <p data-astro-cid-fhgsxkhy>
Contact ${fieldTripCoordinator.name}, the APS Fieldtrip Coordinator${fieldTripCoordinator.email && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` by e-mail at ${renderComponent($$result3, "EmailLink", $$EmailLink, { "email": fieldTripCoordinator.email, "data-astro-cid-fhgsxkhy": true })}` })}`}${fieldTripCoordinator.telephone && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` or phone at ${renderComponent($$result3, "PhoneLink", $$PhoneLink, { "number": fieldTripCoordinator.telephone, "data-astro-cid-fhgsxkhy": true })}` })}`}.
</p> ${pastEvents.length > 0 && renderTemplate`<details data-astro-cid-fhgsxkhy> <summary data-astro-cid-fhgsxkhy><h2 data-astro-cid-fhgsxkhy>Past Field Trips</h2></summary> ${pastEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-fhgsxkhy": true })} ` })}`;
  })} </details>`}` })}  <!-- <section> --> <!-- 	<h2> --> <!-- 		Dinovember 2025 Royal Tyrrell Museum Sleep-In! --> <!-- 	</h2> --> <!-- 	<p> --> <!-- 		The Alberta Palaeontological Society is excited to invite you to a special overnight event at the Royal Tyrrell Museum of Palaeontology in Drumheller, Alberta! --> <!-- 	</p> --> <!-- 	<p> --> <!-- 		<strong>Date</strong>: Friday, November 28 - Saturday, November 29 --> <!-- 	</p> --> <!-- 	<p> --> <!-- 		<strong> --> <!-- 			Itinerary --> <!-- 		</strong> --> <!-- 	</p> --> <!-- 	<ul> --> <!-- 		<li> --> <!-- 			<strong>Friday Evening</strong> --> <!-- 			<ul> --> <!-- 				<li>6:30 PM: Arrive at the museum</li> --> <!-- 				<li>Participate in fun palaeontology activities</li> --> <!-- 				<li>Enjoy snacks</li> --> <!-- 				<li>Lights out for the night</li> --> <!-- 			</ul> --> <!-- 		</li> --> <!-- 		<li><strong>Saturday Morning</strong> --> <!-- 			<ul> --> <!-- 				<li>Breakfast</li> --> <!-- 				<li>Explore the galleries!</li> --> <!-- 			</ul> --> <!-- 		</li> --> <!-- 	</ul> --> <!-- 	<strong>Price</strong>: $54 per person --> <!-- 	<p> --> <!-- 		Your ticket includes: --> <!-- 	</p> --> <!-- <ul> --> <!-- <li>Evening Snacks &amp; Breakfast</li> --> <!-- <li>Palaeontology activities</li> --> <!-- <li>Full-day admission to the museum</li> --> <!-- </ul> --> <!-- <p> --> <!-- This is a fantastic event for kids &amp; families, but we require at least one adult per five children. Please note also that only children between <strong>5 - 13 years old</strong> and their adults are eligible to attend. Unfortunately, <strong>no unacompanied adults are allowed!</strong> --> <!-- </p> --> <!-- <p> --> <!-- <strong>Space is limited</strong> — we're only accepting the first 15 registrants, so don't delay! --> <!-- </p> --> <!-- <p> --> <!-- This program often fills up quickly, so the deadline for registration is <strong>Friday, October 24!</strong> --> <!-- </p> --> <!-- <p> --> <!-- <strong>Registration</strong>: Please see the <a href='/events/fieldtrips'>field trips page</a> on the APS website for more information on how to register. --> <!-- </p> --> <!-- <p> --> <!-- <strong>Additional Information</strong>: Visit <a href="https://www.tyrrellmuseum.com/whats_on/activities/camp-ins">Royal Tyrrell Museum Camp-Ins</a> for more details. --> <!-- </p> --> <!-- <p> --> <!-- 	This is a rare opportunity during the winter months when palaeontology events are usually scarce, so invite friends and family who share your interest in ancient life. Even if they're not yet APS members, this could be the perfect introduction! --> <!-- </p> --> <!-- 	<p>To register, please fill out the <a href="/fieldTrips/2025/Dinovember Field Trip Sign Up-fillable.pdf">sign up sheet</a>.</p> --> <!-- </section> --> <!-- <hr /> -->`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fieldtrips.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fieldtrips.astro";
const $$url = "/events/fieldtrips";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Fieldtrips,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
