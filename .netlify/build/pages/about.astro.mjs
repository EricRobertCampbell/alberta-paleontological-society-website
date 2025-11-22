import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../chunks/HeadingWithBackground_DUFFj7ww.mjs';
export { renderers } from '../renderers.mjs';

const prerender = true;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "About Us" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/rtmpDinos1.jpg" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>About Us</h1> ` })} <p>
Welcome to the Alberta Palaeontological Society (APS), a non-profit
		organization established in 1986 with a distinct mission.
</p> <p>
Our primary objective is to advance the field of palaeontology through
		dedicated study and comprehensive education. We proudly contribute to
		the growth of this scientific discipline by actively engaging in:
</p> <ul> <li>Unearthing new discoveries</li> <li>Practicing ethical collection methods</li> <li>Ensuring meticulous curation and captivating display</li> <li>Educating the wider public about the wonders of palaeontology</li> <li>
Safeguarding palaeontological specimens for both present and future
			generations
</li> </ul> <p>
Collaboration lies at the heart of our efforts. We collaborate with
		professional and academic circles, fostering a collective commitment to
		preserving and comprehending Alberta's rich heritage. Through close
		partnerships, we aid in the conservation and exploration of our region's
		historical treasures.
</p> <p>
At the APS, we are driven by a shared passion for palaeontology and a
		dedication to unearthing the mysteries of the past. Join us on this
		enthralling journey of discovery, knowledge, and preservation as we
		delve into the extraordinary world of Alberta's palaeontological
		heritage.
</p> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/about/index.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/about/index.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
