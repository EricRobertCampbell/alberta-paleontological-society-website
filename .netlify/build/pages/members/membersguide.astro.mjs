import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

const prerender = true;
const $$Membersguide = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Members' Guide", "data-astro-cid-hnm4nhmm": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/waynePetrifiedWood1.jpg", "backgroundPositionY": "60%", "data-astro-cid-hnm4nhmm": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-hnm4nhmm>Members' Guide</h1> ` })} <p data-astro-cid-hnm4nhmm>
Discover the world of palaeontology through the Alberta Palaeontological
		Society's Member's Guide. This resource offers information about the
		society's bylaws, mission, and collaborative community.
</p> <p data-astro-cid-hnm4nhmm>
It also contains practical information for both those new to fossils and
		seasoned collectors about identifying fossils, starting your collection,
		and exploring fossil-rich locations. Additionally, there are links to
		additional resources, such as websites, journals, and maps for further
		exploration.
</p> <p data-astro-cid-hnm4nhmm>Click on the image below to download it!</p> <div id="guide-information" data-astro-cid-hnm4nhmm> <a class="reset-link-style" href="/membership/guide.pdf" data-astro-cid-hnm4nhmm> <img src="/membership/guide9cover.jpg" alt="Cover of the members' guide showing a fossil ammonite" data-astro-cid-hnm4nhmm> </a> </div> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/members/membersguide.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/members/membersguide.astro";
const $$url = "/members/membersguide";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Membersguide,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
