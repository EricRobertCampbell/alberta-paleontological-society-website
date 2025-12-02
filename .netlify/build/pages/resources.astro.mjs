import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
export { renderers } from '../renderers.mjs';

const prerender = true;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Resources" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/pointCampground1.jpg" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>Resources</h1> ` })} <p>
Welcome to our Resources page, your gateway to a curated collection of
		valuable palaeontological references. We've assembled an extensive list
		of resources, ranging from reputable websites and open-access journals
		to materials crafted by our own members. Whether you're a seasoned
		researcher or an enthusiastic beginner, our selection caters to all
		levels of interest and expertise.
</p> <p>
For a comprehensive overview of our resources, navigate using the menu.
</p> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/index.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/index.astro";
const $$url = "/resources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
