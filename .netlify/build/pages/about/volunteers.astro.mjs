import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_BIFLqf3C.mjs';
import { r as roles } from '../../chunks/constants_gZothmyh.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = true;
const $$Volunteers = createComponent(($$result, $$props, $$slots) => {
  const { president } = roles;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Volunteers" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/field1.jpg", "backgroundPositionY": "55%" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>Volunteering Opportunities</h1> ` })} <h2>Committees</h2> <p>
At the Alberta Palaeontological Society, our community thrives on
		passionate individuals who want to be part of something extraordinary.
		Our committees are the driving force behind our society's initiatives,
		and we invite you to lend your skills and enthusiasm to make a lasting
		impact in the world of palaeontology.
</p> <p>
Members that are interested in any committee positions should speak with
		a member of the board. These positions are filled throughout the year as
		openings arise. There is no minimum/maximum term requirement and
		attendance of board meetings is optional.
</p> <p>The following comittees are looking for help:</p> <ul> <li>Fossil Collections</li> <li>Library</li> <li>Public Outreach</li> <li>Webmaster</li> <li>Social</li><li>Symposium</li> </ul> <p>
To find out more please contact ${president.name} at ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "president1@albertapaleo.org" })}.
</p> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/about/volunteers.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/about/volunteers.astro";
const $$url = "/about/volunteers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Volunteers,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
