import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../../../chunks/HeadingWithBackground_DUFFj7ww.mjs';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

const prerender = true;
const $$2024 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "AGM", "data-astro-cid-666kn4qz": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/uofaDunkleosteus.jpg", "backgroundPositionY": "55%", "data-astro-cid-666kn4qz": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-666kn4qz>Annual General Meeting - 2024</h1> ` })} <h2 data-astro-cid-666kn4qz>Notice of Annual General Meeting</h2> <p data-astro-cid-666kn4qz>
Friday, May 10, 2024
</p>
Each member 18 years of age or older shall be entitled to one vote. Votes must be made in person and not by proxy or otherwise.
<p data-astro-cid-666kn4qz>
Outline for the AGM :
</p><ol class="alpha" data-astro-cid-666kn4qz> <li data-astro-cid-666kn4qz>
Adoption of the agenda;
</li> <li data-astro-cid-666kn4qz>
Adoption of the minutes of the previous AGM;
</li> <li data-astro-cid-666kn4qz>
Review of the financial statements and auditor's report;
</li> <li data-astro-cid-666kn4qz>
Appointment of the Auditors for 2024;
</li> <li data-astro-cid-666kn4qz>
Election of the officers and directors;
</li> </ol> <p data-astro-cid-666kn4qz>
Motions that will be voted upon at the 2024 AGM.
</p><p data-astro-cid-666kn4qz></p><ol data-astro-cid-666kn4qz> <li data-astro-cid-666kn4qz>
Appointment of the audiors<br data-astro-cid-666kn4qz> </li> </ol> <ul data-astro-cid-666kn4qz> <li data-astro-cid-666kn4qz> <a href="/agm/2024/agmminutes2023.pdf" data-astro-cid-666kn4qz>Annual General Meeting Minutes May 12, 2023</a> </li> <li data-astro-cid-666kn4qz> <a href="/agm/2024/APSAuditSummary2023RevAndExpenses.pdf" data-astro-cid-666kn4qz>2023 Financial Statements and Auditor's Report (PDF)</a> </li> <li data-astro-cid-666kn4qz> <a href="/agm/2024/audit2023.pptx" data-astro-cid-666kn4qz>2023 Financial Statements and Auditor's Report (PowerPoint)</a> </li> </ul> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/agm/2024.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/agm/2024.astro";
const $$url = "/events/agm/2024";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$2024,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
