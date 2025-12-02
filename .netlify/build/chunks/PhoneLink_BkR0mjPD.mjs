import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate } from './astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$PhoneLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PhoneLink;
  const { number } = Astro2.props;
  const destination = `tel:${number}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(destination, "href")}>${number}</a>`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/PhoneLink.astro", void 0);

export { $$PhoneLink as $ };
