import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_BoddU3be.mjs';
import { f as filterExternalEvents } from '../../chunks/filters_3oDKp2dR.mjs';
import { s as sortEventsByDate } from '../../chunks/eventSorting_CLBN8lUW.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_BIFLqf3C.mjs';
import { $ as $$PhoneLink } from '../../chunks/PhoneLink_BkR0mjPD.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { $ as $$Event } from '../../chunks/Event_CvC2GvxC.mjs';
import { r as roles } from '../../chunks/constants_gZothmyh.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$Fieldtrips = createComponent(async ($$result, $$props, $$slots) => {
  const { fieldTripCoordinator } = roles;
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Field Trips", "data-astro-cid-fhgsxkhy": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/assets/knudsensFarmIntro.jpg", "backgroundPositionY": "30%", "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-fhgsxkhy>Field Trips</h1> ` })} <p data-astro-cid-fhgsxkhy>Field trips are open to members only!</p> <section data-astro-cid-fhgsxkhy> <h2 data-astro-cid-fhgsxkhy>
Dinovember 2025 Royal Tyrrell Museum Sleep-In!
</h2> <p data-astro-cid-fhgsxkhy>
The Alberta Palaeontological Society is excited to invite you to a special overnight event at the Royal Tyrrell Museum of Palaeontology in Drumheller, Alberta!
</p> <p data-astro-cid-fhgsxkhy> <strong data-astro-cid-fhgsxkhy>Date</strong>: Friday, November 28 - Saturday, November 29
</p> <p data-astro-cid-fhgsxkhy> <strong data-astro-cid-fhgsxkhy>
Itinerary
</strong> </p> <ul data-astro-cid-fhgsxkhy> <li data-astro-cid-fhgsxkhy> <strong data-astro-cid-fhgsxkhy>Friday Evening</strong> <ul data-astro-cid-fhgsxkhy> <li data-astro-cid-fhgsxkhy>6:30 PM: Arrive at the museum</li> <li data-astro-cid-fhgsxkhy>Participate in fun palaeontology activities</li> <li data-astro-cid-fhgsxkhy>Enjoy snacks</li> <li data-astro-cid-fhgsxkhy>Lights out for the night</li> </ul> </li> <li data-astro-cid-fhgsxkhy><strong data-astro-cid-fhgsxkhy>Saturday Morning</strong> <ul data-astro-cid-fhgsxkhy> <li data-astro-cid-fhgsxkhy>Breakfast</li> <li data-astro-cid-fhgsxkhy>Explore the galleries!</li> </ul> </li> </ul> <strong data-astro-cid-fhgsxkhy>Price</strong>: $54 per person
<p data-astro-cid-fhgsxkhy>
Your ticket includes:
</p> <ul data-astro-cid-fhgsxkhy> <li data-astro-cid-fhgsxkhy>Evening Snacks &amp; Breakfast</li> <li data-astro-cid-fhgsxkhy>Palaeontology activities</li> <li data-astro-cid-fhgsxkhy>Full-day admission to the museum</li> </ul> <p data-astro-cid-fhgsxkhy>
This is a fantastic event for kids &amp; families, but we require at least one adult per five children. Please note also that only children between <strong data-astro-cid-fhgsxkhy>5 - 13 years old</strong> and their adults are eligible to attend. Unfortunately, <strong data-astro-cid-fhgsxkhy>no unacompanied adults are allowed!</strong> </p> <p data-astro-cid-fhgsxkhy> <strong data-astro-cid-fhgsxkhy>Space is limited</strong> — we're only accepting the first 15 registrants, so don't delay!
</p> <p data-astro-cid-fhgsxkhy>
This program often fills up quickly, so the deadline for registration is <strong data-astro-cid-fhgsxkhy>Friday, October 24!</strong> </p> <p data-astro-cid-fhgsxkhy> <strong data-astro-cid-fhgsxkhy>Registration</strong>: Please see the <a href="/events/fieldtrips" data-astro-cid-fhgsxkhy>field trips page</a> on the APS website for more information on how to register.
</p> <p data-astro-cid-fhgsxkhy> <strong data-astro-cid-fhgsxkhy>Additional Information</strong>: Visit <a href="https://www.tyrrellmuseum.com/whats_on/activities/camp-ins" data-astro-cid-fhgsxkhy>Royal Tyrrell Museum Camp-Ins</a> for more details.
</p> <p data-astro-cid-fhgsxkhy>
This is a rare opportunity during the winter months when palaeontology events are usually scarce, so invite friends and family who share your interest in ancient life. Even if they're not yet APS members, this could be the perfect introduction!
</p> <p data-astro-cid-fhgsxkhy>To register, please fill out the <a href="/fieldTrips/2025/Dinovember Field Trip Sign Up-fillable.pdf" data-astro-cid-fhgsxkhy>sign up sheet</a>.</p> </section> <hr data-astro-cid-fhgsxkhy> <h2 data-astro-cid-fhgsxkhy>Registration and Payment</h2> <p data-astro-cid-fhgsxkhy>
To register for a field trip, print off and fill out the <a href="/fieldTrips/2025/APSFieldTripsForm2025.pdf" data-astro-cid-fhgsxkhy>sign up sheet</a>, then mail to ${fieldTripCoordinator.name} at the address indicated on the sign up sheet along with the field trip fee.
</p> <p data-astro-cid-fhgsxkhy>
Continuing from previous years, you will be able to pay field trip fees by
		Interac E-transfer (Canada only). Follow directions on your bank’s
		online banking site or mobile app. Bank fees may apply. Payee is
${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "giftshop@albertapaleo.org", "subject": "Field Trip Fees for 2025", "data-astro-cid-fhgsxkhy": true })}. Please state in the message field: “Field Trip Fees for 2025”. Email
		a scan or photo of the completed registration form to
${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "fieldtrips@albertapaleo.org", "data-astro-cid-fhgsxkhy": true })}.
</p> <h2 data-astro-cid-fhgsxkhy>Field Trip Terms</h2> <p data-astro-cid-fhgsxkhy>
All fees are due at the time of registration. Fees for trips are generally, $10.00, although please check the individual trip.
		Non-members and unaccompanied minors will not be allowed to attend field
		trips. All participants are required to have their membership in good
		standing. Any membership applications received after May 1, 2025 will
		not be reviewed and voted on by the Board of Directors until September,
		2025. Therefore, if you are a non-member and would like to join be sure
		your application is received prior to May 1, 2025. All participants will
		be required to read and sign a release form (waiver). Detailed
		information will be provided to all those registered shortly after the
		registration deadline. After the registration deadline no refunds will
		be given; however, you will receive the guide for the trip.
		Registrations are accepted on a first come first served basis so sign up
		early to avoid disappointment. For the 2025 field trips Keith will be
		sending you the waiver and medical forms along with the trip
		information. This information will be sent to you via email or Canada
		Post. Please ensure that your addresses are correct and legible when
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
</p> <h2 data-astro-cid-fhgsxkhy>Questions about field trips?</h2> <p data-astro-cid-fhgsxkhy>
Contact ${fieldTripCoordinator.name}, the APS Fieldtrip Coordinator${fieldTripCoordinator.email && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` by e-mail at ${renderComponent($$result3, "EmailLink", $$EmailLink, { "email": fieldTripCoordinator.email, "data-astro-cid-fhgsxkhy": true })}` })}`}${fieldTripCoordinator.telephone && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` or phone at ${renderComponent($$result3, "PhoneLink", $$PhoneLink, { "number": fieldTripCoordinator.telephone, "data-astro-cid-fhgsxkhy": true })}` })}`}.
</p> <section data-astro-cid-fhgsxkhy> <h2 data-astro-cid-fhgsxkhy>
Forms
</h2> <ul class="field-trip-forms-list" data-astro-cid-fhgsxkhy> <li data-astro-cid-fhgsxkhy> <a href="/fieldTrips/2025/APSFieldTripsForm2025.pdf" data-astro-cid-fhgsxkhy>2025 Registration Form</a> </li> <li data-astro-cid-fhgsxkhy> <a href="/fieldTrips/2025/forms/APS_Adult_Waiver.pdf" data-astro-cid-fhgsxkhy>
Adult Waiver
</a> </li> <li data-astro-cid-fhgsxkhy> <a href="/fieldTrips/2025/forms/APS_Minor_Waiver.pdf" data-astro-cid-fhgsxkhy>
Minor Waiver
</a> </li> <li data-astro-cid-fhgsxkhy> <a href="/fieldTrips/2025/forms/APS_ER_ContactMedInfo.pdf" data-astro-cid-fhgsxkhy>
Medical and Emergency Contact Information
</a> </li> </ul> </section> <h2 data-astro-cid-fhgsxkhy>Upcoming Field Trips</h2> ${upcomingEvents.length > 0 ? upcomingEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-fhgsxkhy": true })} ` })}`;
  }) : renderTemplate`<p data-astro-cid-fhgsxkhy>No upcoming field trips are currently scheduled. Check back soon for new dates!</p>`}${pastEvents.length > 0 && renderTemplate`<details open data-astro-cid-fhgsxkhy> <summary data-astro-cid-fhgsxkhy><h2 data-astro-cid-fhgsxkhy>Past Field Trips</h2></summary> ${pastEvents.map((event, index, allEvents2) => {
    const { Content, slug } = event;
    return renderTemplate`${renderComponent($$result2, "Event", $$Event, { "frontmatter": event.remarkPluginFrontmatter, "last": index === allEvents2.length - 1, "showPermalink": true, "slug": slug, "data-astro-cid-fhgsxkhy": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-fhgsxkhy": true })} ` })}`;
  })} </details>`}` })} `;
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
