import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = true;
const $$Opensourcepublications = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Open Source Publications" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/canyonCreek1.jpg" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1>Open Source Publications with Emphasis on Local Content</h1> ` })} <p>
The APS Library includes popular and technical books on all sorts of
		subjects related to palaeontology. The following documents are available
		to members and can be signed out on a short term basis or can be
		downloaded here.
</p> <ul> <li> <a href="/openSourcePublications/noad1.pdf">Fossil hunting day trips from Calgary, Alberta</a> , generously donated by APS member, Jon Noad.
</li> <li> <a href="/openSourcePublications/mundy.pdf">
Stratigraphy, Sedimentology, Structural History and Exploration
				History of the Mississippian at Moose Mountain Southwestern
				Alberta Foothills</a> , generously donated by APS member, Dr. David Mundy.
</li> <li><a href="https://www.academia.edu/112676060">Review of the surface Cretaceous-Paleogene (K-Pg) boundary localities of Alberta, Canada</a>, written by APS member Jacques LeBlanc.
<blockquote>The Cretaceous-Paleogene (K-Pg; formerly K-T) surface localities in Alberta offer a unique glimpse into the dramatic transition that occurred in Earth's history approximately 66 million years ago. This period marks the boundary between the Cretaceous and Paleogene epochs and is associated with one of the most devastating mass extinction events in the planet's history, including the extinction of the non-avian dinosaurs. In this book, we will delve into the surface localities in Alberta that provide valuable evidence and insights into this pivotal moment in time. We will examine eight surface K-Pg boundary localities, explore their geological context, and briefly highlight significant fossil assemblages below and above the boundary when possible.</blockquote>
This publication can also be downloaded from
<ul><li><a href="https://sites.google.com/site/leblancjacques">Google Sites</a></li><li><a href="https://www.academia.edu/112676060">Academia.edu</a></li><li><a href="https://www.researchgate.net/publication/377002283_Review_of_the_surface_Cretaceous-Paleogene_K-Pg_boundary_localities_of_Alberta_Canada">ResearchGate</a></li></ul> </li></ul> ` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/opensourcepublications.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/opensourcepublications.astro";
const $$url = "/resources/opensourcepublications";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Opensourcepublications,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
