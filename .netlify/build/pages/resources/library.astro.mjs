import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_S4n-JgDR.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_Dz5yupWI.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CsQAwjqL.mjs';
export { renderers } from '../../renderers.mjs';

const $$Library = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Library" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/redDeerRiverValley1.jpg" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h2>APS Library Page</h2> ` })} <p>
The APS Library includes popular and technical books on all sorts of
    subjects related to palaeontology. The books are available to members and
    can be signed out on a short term basis.
</p> <p>The APS Library is located in room B108 at Mount Royal University.</p> <p>
A catalogue of all documents in the APS library is available to${" "} <a href="/library.xls">download in Excel format</a>.
</p> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/library.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/library.astro";
const $$url = "/resources/library";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Library,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
