import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
/* empty css                                                */
export { renderers } from '../../renderers.mjs';

const prerender = true;
const $$Fieldtrippictures = createComponent(($$result, $$props, $$slots) => {
  const allPictures = [
    {
      title: "June Field trip 2021-1 to Tyndall Stone, Calgary",
      pictures: [
        {
          thumbnail: "/fieldTripPictures/2021-1/tyndallSmall.jpg",
          location: "/fieldTripPictures/2021-1/tyndallBig.jpg",
          caption: "Ordovician limestone from Manitoba"
        }
      ]
    },
    {
      title: "June Field trip 2021-2 to Manyberries",
      pictures: [
        {
          thumbnail: "/fieldTripPictures/2021-2/manyberriesSmall.jpg",
          location: "/fieldTripPictures/2021-2/manyberriesLarge.jpg",
          caption: "Dinosaur Park Formation, Cretaceous"
        }
      ]
    },
    {
      title: "July Field trip 2021-3 to Dry Island",
      pictures: [
        {
          thumbnail: "/fieldTripPictures/2021-3/dryIslandSmall.jpg",
          location: "/fieldTripPictures/2021-3/dryIslandLarge.jpg",
          caption: "Horseshoe Canyon Formation, Cretaceous"
        }
      ]
    },
    {
      title: " August Field trip 2021-4 to Stanley Glacier",
      pictures: [
        {
          thumbnail: "/fieldTripPictures/2021-4/stanleySmall.jpg",
          location: "/fieldTripPictures/2021-4/stanleyLarge.jpg",
          caption: "Cathedral Formation, Cambrian"
        }
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Field Trip Pictures", "data-astro-cid-avvicduo": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackgrounds", $$HeadingWithBackground, { "background": "/headingBackgrounds/canyonCreek2.jpg", "backgroundPositionY": "30%", "data-astro-cid-avvicduo": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-avvicduo>Field Trip Pictures</h1> ` })} <p data-astro-cid-avvicduo>
The following are some pictures taken by our members of previous field
		trips. If you are interested in attending, see the <a href="/events/fieldtrips" data-astro-cid-avvicduo>
field trips page
</a> for current and upcoming field trips!
</p> <section data-astro-cid-avvicduo> <h2 data-astro-cid-avvicduo>Field Trip Pictures 2021</h2> ${allPictures.map((fieldTripPictures) => {
    return renderTemplate`<section data-astro-cid-avvicduo> <h3 class="field-trip-title" data-astro-cid-avvicduo> ${fieldTripPictures.title} </h3> ${fieldTripPictures.pictures && fieldTripPictures.pictures.length > 0 ? renderTemplate`<div class="field-trip-pictures" data-astro-cid-avvicduo> ${fieldTripPictures.pictures.map((picture) => {
      return renderTemplate`<figure data-astro-cid-avvicduo> <a class="reset-link-style"${addAttribute(picture.location, "href")} data-astro-cid-avvicduo> <img${addAttribute(picture.thumbnail, "src")}${addAttribute(picture.caption, "alt")} data-astro-cid-avvicduo> </a> <figcaption data-astro-cid-avvicduo> ${picture.caption} </figcaption> </figure>`;
    })} </div>` : null} </section>`;
  })} </section> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fieldtrippictures.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fieldtrippictures.astro";
const $$url = "/events/fieldtrippictures";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Fieldtrippictures,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
