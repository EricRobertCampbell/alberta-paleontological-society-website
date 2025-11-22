import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_DUFFj7ww.mjs';
import { g as getCollection } from '../../chunks/_astro_content_kjL--9gh.mjs';
/* empty css                                  */
export { renderers } from '../../renderers.mjs';

const prerender = true;
const $$Faq = createComponent(async ($$result, $$props, $$slots) => {
  const allQuestions = (await getCollection("faqs")).sort((a, b) => {
    return a.data.order - b.data.order;
  });
  const allRenderedQuestions = await Promise.all(
    allQuestions.map(async (event) => await event.render())
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "FAQ", "data-astro-cid-cec54yzl": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/noseHill1.jpg", "data-astro-cid-cec54yzl": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-cec54yzl>Frequently Asked Questions</h1> ` })} ${allRenderedQuestions.map((q) => {
    const originalQuestion = allQuestions.find(
      (originalQ) => originalQ.data.question === q.remarkPluginFrontmatter.question
    );
    return renderTemplate`<section${addAttribute(`${originalQuestion.slug}`, "id")} data-astro-cid-cec54yzl> <p class="question" data-astro-cid-cec54yzl>${originalQuestion.data.question}</p> ${renderComponent($$result2, "q.Content", q.Content, { "data-astro-cid-cec54yzl": true })} </section>`;
  })}` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/faq.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/faq.astro";
const $$url = "/resources/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Faq,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
