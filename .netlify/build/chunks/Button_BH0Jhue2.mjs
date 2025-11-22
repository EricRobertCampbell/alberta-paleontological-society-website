import { c as createComponent, b as createAstro, m as maybeRenderHead, s as spreadAttributes, h as renderSlot, a as renderTemplate } from './astro/server_DfjRAjzK.mjs';
/* empty css                                    */
import 'clsx';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { props } = Astro2;
  return renderTemplate`${maybeRenderHead()}<button${spreadAttributes(props, void 0, { "class": "astro-vnzlvqnm" })} data-astro-cid-vnzlvqnm> ${renderSlot($$result, $$slots["default"])} </button> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/Button.astro", void 0);

export { $$Button as $ };
