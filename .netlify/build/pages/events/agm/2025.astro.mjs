import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../../../chunks/HeadingWithBackground_DUFFj7ww.mjs';
import { $ as $$PhoneLink } from '../../../chunks/PhoneLink_BkR0mjPD.mjs';
import { $ as $$EmailLink } from '../../../chunks/EmailLink_BIFLqf3C.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = true;
const $$2025 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "AGM" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/uofaDunkleosteus.jpg", "backgroundPositionY": "55%" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>Annual General Meeting - 2025</h1> ` })} <h2>Notice of Annual General Meeting</h2> <p>
Friday, May 9, 2025
</p> <p>
Take notice that the Annual General Meeting (AGM) of the Members of the Alberta Palaeontological
Society (hereinafter called "The Society") will be held after the main guest presentation on Friday the 9th
day of May, 2025, at Mount Royal University in room B108, at the hour of 7:30 o'clock in the evening
local time, to deal with the following business to be brought before the Meeting:
</p> <h2>
Agenda
</h2> <ol> <li><strong>Adoption of Agenda.</strong></li> <li> <strong>
Minutes of 2024 AGM
</strong>
Members will be asked to adopt the <a href="/agm/2025/APS AGM Minutes 2024.pdf">minutes of the 2024 AGM</a> </li> <li> <strong>
Audit
</strong> Treasurer's presentation of the audited statement of the financial position of The Society. You can <a href="/agm/2025/APS2024RevenuesAndExpensesAudited.pdf">view the audited statement here (pdf)</a> or <a href="/agm/2025/audit2024.pptx">here (PowerPoint)</a>.
</li> <li> <strong>
Appointment of Auditors for the 2025 APS Treasurer Books and Minutes
</strong>
Auditors nominated by the Treasurer for appointment are Lorraine Stratkotter and Jennifer Hibbard.
</li> <li> <strong>
Election of Officers and Directors to the Board of The Society.
</strong>
All APS members 18 years and older are entitled to vote. Officer positions are 1 year terms and
		directorships are 2 year terms. Nominations are being solicited for the following positions:
<h3>
Officers
</h3> <ul> <li>
President
</li> <li>
Vice-President
</li> <li>
Secretary
</li> <li>
Treasurer
</li> </ul> <h3>
Directors
</h3> <ul> <li>
Directors Program Co-ordinator
</li> <li>
Membership Co-ordinator
</li> <li>
Editor
</li> <li>
Field Trip Co-ordinator
</li> </ul> <p>
In addition to the elected positions The Society has a number of committee chairs which are appointed
			by the board. Terms for these chairs are unlimited:
</p> <table> <thead> <tr> <th scope="col">
Committee
</th> <th scope="col">
Current Chairperson
</th> </tr> </thead> <tbody> <tr> <td>Fossil Collection </td><td>Howard Allen</td> </tr> <tr> <td>Library</td> <td>Georgia Hoffman</td> </tr> <tr> <td>Public Outreach</td> <td>Cory Gross</td> </tr> <tr> <td>Social</td><td> Virginia Goodman</td> </tr> <tr> <td>Symposium</td> <td>Mona Trick</td> </tr> <tr> <td>APS Paleontological Fund</td> <td>Mona Trick</td> </tr> <tr> <td>Website</td> <td>Eric Campbell</td> </tr> </tbody> </table> <p>
Terms for all positions begin September 1. If you would like more information about Board positions or
			are interested in chairing or participating on a committee, please contact Past President Wayne
			Braunberger at ${renderComponent($$result2, "PhoneLink", $$PhoneLink, { "number": "(403) 278-5154" })} or by e-mail, ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "pastpres@albertapaleo.org" })}. All inquiries will be kept
			confidential if requested.
</p> </li> <li> <strong>
New Business
</strong><br> <p>
If you have any items of New Business to be brought forward, contact Society President Cory Gross at
${renderComponent($$result2, "PhoneLink", $$PhoneLink, { "number": "(403) 617-2079" })} or by e-mail, ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "president1@albertapaleo.org" })}.
</p> </li> </ol> <section> <h2>
Previous Meetings
</h2> <p>
For details about previous AGMs, please see
</p> <ul> <li> <a href="/events/agm/2024">2024 AGM</a> </li> </ul> </section> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/agm/2025.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/agm/2025.astro";
const $$url = "/events/agm/2025";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$2025,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
