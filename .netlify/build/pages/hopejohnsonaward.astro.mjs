import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../chunks/HeadingWithBackground_DUFFj7ww.mjs';
export { renderers } from '../renderers.mjs';

const prerender = true;
const $$Hopejohnsonaward = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Hope Johnson Award" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/wayne1.jpg", "backgroundPositionY": "20%" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>Hope Johnson Award</h1> ` })} <p>
The Hope Johnson Award was created in 2019 to recognize accomplishments
		of non-professionals in palaeontology. An award of $250 will be given
		annually. See the attached document which describes the criteria to
		qualify and how to apply.
</p><p> <a href="/awards/hopejohnsonaward.pdf">Hope Johnson Award, award for non professionals</a> </p> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/hopejohnsonaward.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/hopejohnsonaward.astro";
const $$url = "/hopejohnsonaward";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Hopejohnsonaward,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
