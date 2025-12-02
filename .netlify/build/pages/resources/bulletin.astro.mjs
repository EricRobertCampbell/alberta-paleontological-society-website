import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_BIFLqf3C.mjs';
import { r as roles } from '../../chunks/constants_gZothmyh.mjs';
export { renderers } from '../../renderers.mjs';

const $$Bulletin = createComponent(($$result, $$props, $$slots) => {
  const { editor } = roles;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Bulletin" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/devilsCouleeGroup1.jpg", "backgroundPositionY": "35%" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h2>Bulletin</h2> ` })} <p>
The APS Bulletin is published every March, June, September and December,
		and features reviews, fossil news, members' contributions and society
		announcements. The deadline for submitting material is the 15th of the
		month prior to publication.
</p> <p>
Documents on this page are in PDF format and require Acrobat Reader to
		view and print.
</p> <a class="reset-link-style" href="http://www.adobe.com/products/acrobat/readstep2.html"> <img src="/acrobat.gif" alt="Get Adobe Reader"> </a> <p>Click image to download this free software.</p> <h3>SAMPLE BULLETIN</h3> <a href="/bulletinsample3.pdf">Click here to download APS BULLETIN SAMPLE</a>. This file is 1.6 MB in size.
<h3>BULLETIN EXTRAS</h3> <ul> <li>
An article in the June 2020 Bulletin by Pete Truch on his trip to
			Newfoundland, reference to Appendix 1, and <a href="/greenland flyover.pdf">FLYOVER OF GREENLAND</a> (7 MB file) with air photos of various glacial features.
</li> <li>
An article in the June 2007 Bulletin refers to the use of locality
			slips to keep track of your fossils. <a href="/localityslips.pdf">Download FOSSIL LOCALITY SLIPS</a>.
</li> </ul> <h3>APS PRESENTATIONS</h3> <p>
This monthly presentation about Tyndall limestone quarried in Manitoba
		was given by Tako Koning on April 8, 2022. This presentation is without
		the speaker audio. <a href="/Tyndall Talk April 8 2022.pdf">Tyndall Talk April 8 2022.pdf</a>.
</p> <h3>Submissions</h3> <p>
Submissions / articles can be e-mailed to the editor at ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": editor.email })}.
</p>
- or -
<p>
Submissions / articles can be sent to: </p><address> ${editor.name}, Bulletin Editor<br>
c/o Alberta Palaeontological Society<br>
P.O. Box 68024, Crowfoot Postal Outlet<br>
Calgary, Alberta T3G 3N8<br>
Canada
</address>  <p> ${editor.name} can take your submissions electronically and can handle most
		common formats.
</p> <p>
Readers are advised that opinions expressed in Bulletin articles are
		those of the author and do not necessarily reflect the views of the
		Society. Except for articles marked "© Copyright," reprinting of
		articles by exchange bulletins is permitted, as long as appropriate
		credit is given. Requests for missing issues of the Bulletin should be
		addressed to the editor.
</p> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/bulletin.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/bulletin.astro";
const $$url = "/resources/bulletin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Bulletin,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
