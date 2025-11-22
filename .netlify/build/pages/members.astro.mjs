import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../chunks/HeadingWithBackground_DUFFj7ww.mjs';
import { $ as $$EmailLink } from '../chunks/EmailLink_BIFLqf3C.mjs';
import { r as roles } from '../chunks/constants_gZothmyh.mjs';
export { renderers } from '../renderers.mjs';

const prerender = true;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const { treasurer } = roles;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Membership" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/wayneNodule1.jpg", "backgroundPositionY": "20%" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>Membership</h1> ` })} <section> <h2>Benefits</h2> <p>
Becoming a member of the Alberta Palaeontological Society offers a
			myriad of rewarding experiences that extend far beyond personal
			enrichment. By joining our community, you not only gain access to a
			wealth of knowledge and resources, but you also actively contribute
			to the advancement of palaeontology in Alberta.
</p> <p>
One of the most significant benefits of membership is the
			opportunity to be an integral part of a passionate and collaborative
			community. As a member, you play a vital role in supporting the
			society's mission to promote the study, preservation, and
			appreciation of fossils. Your contribution helps sustain our efforts
			to organize events, workshops, and educational programs that foster
			a deeper understanding of our planet's ancient history.
</p> <p>
Moreover, membership opens the door to exciting field trips that
			take you to fossil-rich locations across Alberta. Embark on journeys
			of exploration alongside fellow enthusiasts and expert
			palaeontologists who share your passion. These field trips offer a
			hands-on experience, allowing you to gain insights into the
			fascinating processes of discovery and research.
</p> <p>
Becoming a member of the Alberta Palaeontological Society isn't just
			about joining an organization – it's about becoming part of a
			dynamic network of individuals who share a common love for
			palaeontology. Your membership contributes to the preservation of
			our prehistoric heritage and provides you with unparalleled
			opportunities to delve into the world of fossils, learn from
			experts, and create lasting memories on field trips. Join us today
			and immerse yourself in a journey of discovery!
</p> </section> <section> <h2>Becoming a Member</h2> <h3>By Mail</h3> <p>
If you choose to mail in the form, print our membership form, fill
			it out and mail it to the Alberta Palaeontological Society at the
			address provided at the bottom of the form along with your cheque.
</p> <p> <a href="/membership/appformfillable.pdf">APS Membership Form</a> </p> <h3>BY INTERAC E-TRANSFER</h3>
If paying by Interac e-Transfer, you may either print off, fill out, and
		sign the
<p> <a href="/membership/appformfillable.pdf">APS Membership Form</a> </p><p>
then scan your completed form and email it to ${treasurer.name} at ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "giftshop@albertapaleo.org" })}.
</p> <p>
or<br> </p> <p>
use our fillable PDF form and email it to ${treasurer.name} at the above
			email address and pay by Interac e-Transfer.
</p><p> <a href="/membership/appformfillable.pdf">APS Membership (Fillable Form)</a> </p><p>
The signature field can be left blank, and the applicant’s payment
			will serve as a proxy for a signature.
</p> <p>
For any questions about application for membership, explanation
			about benefits of joining, or about your membership status, ask the
			membership director by sending an e-mail to ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "membership@albertapaleo.org" })}.
</p> </section> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/members/index.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/members/index.astro";
const $$url = "/members";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
