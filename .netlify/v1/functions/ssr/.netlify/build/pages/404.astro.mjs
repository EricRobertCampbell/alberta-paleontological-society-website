import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_S4n-JgDR.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Dz5yupWI.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Error 404 - Page Not Found</h1> <p>Whoops! It looks like that page doesn't exist.</p> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/404.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
