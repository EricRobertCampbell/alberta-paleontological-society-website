import { c as createComponent, b as createAstro, u as defineStyleVars, m as maybeRenderHead, d as addAttribute, h as renderSlot, a as renderTemplate } from './astro/server_DfjRAjzK.mjs';
/* empty css                         */
import 'clsx';

const $$Astro = createAstro();
const $$HeadingWithBackground = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeadingWithBackground;
  const {
    background,
    backgroundPositionX = "50%",
    backgroundPositionY = "50%",
    opacity = 0.3
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{
    backgroundUrl: `url(${background})`,
    backgroundPositionX,
    backgroundPositionY,
    opacityValue: opacity
  }]);
  return renderTemplate`${maybeRenderHead()}<div class="background-container" data-astro-cid-pjtdvgdd${addAttribute($$definedVars, "style")}> <div class="heading-container" data-astro-cid-pjtdvgdd${addAttribute($$definedVars, "style")}> ${renderSlot($$result, $$slots["default"])} </div> </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/HeadingWithBackground.astro", void 0);

export { $$HeadingWithBackground as $ };
