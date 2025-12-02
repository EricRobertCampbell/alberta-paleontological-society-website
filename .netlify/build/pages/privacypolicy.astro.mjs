import { c as createComponent, m as maybeRenderHead, a as renderTemplate, b as createAstro, d as addAttribute, h as renderSlot, r as renderComponent } from '../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { g as getCollection } from '../chunks/_astro_content_BoddU3be.mjs';
import { $ as $$Layout } from '../chunks/Layout_CIWrSEVh.mjs';
import 'clsx';
/* empty css                                         */
export { renderers } from '../renderers.mjs';

const $$LinkToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div data-astro-cid-3tnctrc4> <a href="#top" data-astro-cid-3tnctrc4>Back to Top</a> </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/LinkToTop.astro", void 0);

const $$Astro = createAstro();
const $$Disclaimer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Disclaimer;
  const { frontmatter, last } = Astro2.props;
  const { title, id } = frontmatter;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")}> <h3>${title}</h3> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "LinkToTop", $$LinkToTop, {})} ${!last ? renderTemplate`<hr>` : null} </section>`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/Disclaimer.astro", void 0);

const prerender = true;
const $$Privacypolicy = createComponent(async ($$result, $$props, $$slots) => {
  const allDisclaimers = await getCollection("disclaimers");
  const renderedDisclaimers = await Promise.all(
    allDisclaimers.sort((a, b) => a.data.index - b.data.index).map(async (disclaimer) => await disclaimer.render())
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Privacy Policy" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Privacy Policy</h1> ${renderedDisclaimers.map((disclaimer, index, allDisclaimers2) => {
    const { Content } = disclaimer;
    return renderTemplate`${renderComponent($$result2, "Disclaimer", $$Disclaimer, { "frontmatter": disclaimer.remarkPluginFrontmatter, "last": index === allDisclaimers2.length - 1 }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, {})} ` })}`;
  })}` })}`;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/privacypolicy.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/privacypolicy.astro";
const $$url = "/privacypolicy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Privacypolicy,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
