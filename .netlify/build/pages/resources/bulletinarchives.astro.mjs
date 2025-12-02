import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { g as getCollection, a as getEntry } from '../../chunks/_astro_content_BoddU3be.mjs';
/* empty css                                               */
export { renderers } from '../../renderers.mjs';

const prerender = true;
const $$Bulletinarchives = createComponent(async ($$result, $$props, $$slots) => {
  const allBulletins = await getCollection("bulletins");
  const allBulletinVolumes = await getCollection("bulletinVolumes");
  const mapping = {};
  for (let bulletin of allBulletins) {
    const volume = await getEntry(bulletin.data.volume);
    if (volume.data.number in mapping) {
      mapping[volume.data.number].push(bulletin);
    } else {
      mapping[volume.data.number] = [bulletin];
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Bulletin Archives", "data-astro-cid-rm5nefeo": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/upperKananaskisLake1.jpg", "backgroundPositionY": "20%", "data-astro-cid-rm5nefeo": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-rm5nefeo>Bulletin Archives</h1> ` })} <div id="sections-container" data-astro-cid-rm5nefeo> ${Object.entries(mapping).sort((a, b) => {
    return b[0] - a[0];
  }).map(([volumeNumber, bulletins]) => {
    const associatedVolume = allBulletinVolumes.find(
      (v) => v.data.number == volumeNumber
    );
    return renderTemplate`<section${addAttribute(volumeNumber, "id")} data-astro-cid-rm5nefeo> <h3 data-astro-cid-rm5nefeo>
Volume ${volumeNumber} (
${associatedVolume.data.year})
</h3> <ul data-astro-cid-rm5nefeo> ${bulletins.map((bulletin) => {
      return renderTemplate`<li data-astro-cid-rm5nefeo> <a${addAttribute(bulletin.data.location, "href")} data-astro-cid-rm5nefeo>
Number ${bulletin.data.number} (
${bulletin.data.month})
</a> </li>`;
    })} </ul> </section>`;
  })} </div> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/bulletinarchives.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/bulletinarchives.astro";
const $$url = "/resources/bulletinarchives";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Bulletinarchives,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
