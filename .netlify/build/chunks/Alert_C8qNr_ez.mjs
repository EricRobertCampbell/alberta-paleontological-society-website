import { c as createComponent, b as createAstro, m as maybeRenderHead, h as renderSlot, a as renderTemplate } from './astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                        */

const $$Astro = createAstro();
const $$Alert = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Alert;
  const { children } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="alert" data-astro-cid-wpkbbupk> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/Alert.astro", void 0);

export { $$Alert as $ };
