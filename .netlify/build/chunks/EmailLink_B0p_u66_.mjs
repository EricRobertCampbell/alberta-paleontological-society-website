import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate } from './astro/server_S4n-JgDR.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$EmailLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EmailLink;
  const { email, subject } = Astro2.props;
  const destination = `mailto:${email}${subject ? `?subject=${subject}` : ``}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(destination, "href")}>${email}</a>`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/EmailLink.astro", void 0);

export { $$EmailLink as $ };
