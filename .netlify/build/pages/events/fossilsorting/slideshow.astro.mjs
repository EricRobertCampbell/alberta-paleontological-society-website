import { c as createComponent, a as renderTemplate, f as renderScript, d as addAttribute, g as renderHead } from '../../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getCollection } from '../../../chunks/_astro_content_kjL--9gh.mjs';
/* empty css                                           */
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Slideshow = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Fossil Sorting Slideshow";
  const allImages = await getCollection("fossilSortingImages");
  const images = allImages.map((entry) => entry.data);
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-5gq7orer> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>', '</title><link rel="stylesheet" href="/revealjs/dist/reset.css"><link rel="stylesheet" href="/revealjs/dist/reveal.css"><link rel="stylesheet" href="/revealjs/dist/theme/black.css">', '</head> <body data-astro-cid-5gq7orer> <div class="reveal" data-astro-cid-5gq7orer> <div class="slides" data-astro-cid-5gq7orer> <section data-astro-cid-5gq7orer> <h1 data-astro-cid-5gq7orer>', "</h1> <h3 data-astro-cid-5gq7orer>Images from recent APS microfossil sorting sessions</h3> </section> ", ' </div> </div> <script src="/revealjs/dist/reveal.js" type="text/javascript"><\/script> ', " </body> </html> "])), title, renderHead(), title, images.map((img) => renderTemplate`<section data-astro-cid-5gq7orer> <figure class="slide-figure" data-astro-cid-5gq7orer> <img${addAttribute(img.src, "src")}${addAttribute(img.description, "alt")} class="slide-image" data-astro-cid-5gq7orer> <figcaption class="slide-caption" data-astro-cid-5gq7orer> <p class="slide-description" data-astro-cid-5gq7orer>${img.description}</p> <p class="slide-credit" data-astro-cid-5gq7orer><strong data-astro-cid-5gq7orer>Finder:</strong> ${img.finderCredit}</p> </figcaption> </figure> </section>`), renderScript($$result, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fossilsorting/slideshow.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fossilsorting/slideshow.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fossilsorting/slideshow.astro";
const $$url = "/events/fossilsorting/slideshow";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Slideshow,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
