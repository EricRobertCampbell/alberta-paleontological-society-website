import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent, u as defineStyleVars, h as renderSlot, g as renderHead } from './astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import 'clsx';
import { p as pathMatchesDestination } from './functions_UiSr9xwT.mjs';
/* empty css                         */
import { S as SOCIAL_MEDIA_LINKS } from './constants_gZothmyh.mjs';

const links = [
  { destination: "/", label: "Home" },
  {
    destination: "/events/",
    label: "Events",
    subheadings: [
      {
        destination: "/events/monthlymeetings",
        label: "Monthly Meetings"
      },
      {
        destination: "/events/fieldtrips",
        label: "Field Trips"
      },
      {
        destination: "/events/fossilsorting",
        label: "Fossil Sorting"
      },
      {
        destination: "/events/calendar",
        label: "Calendar"
      },
      {
        destination: "/events/fieldtrippictures",
        label: "Field Trip Pictures"
      },
      {
        destination: "/events/agm/2025",
        label: "Annual General Meeting"
      },
      { destination: "/events/symposium", label: "Symposium" }
    ]
  },
  {
    destination: "/resources/",
    label: "Resources",
    subheadings: [
      { destination: "/resources/library", label: "Library" },
      {
        destination: "/resources/fossilcollection",
        label: "Fossil Collection"
      },
      { destination: "/resources/bulletin", label: "Bulletin" },
      {
        destination: "/resources/bulletinarchives",
        label: "Bulletin Archives"
      },
      { destination: "/resources/fossilfriday", label: "Fossil Friday" },
      { destination: "/resources/links", label: "Links" },
      {
        destination: "/resources/opensourcepublications",
        label: "Open Source Publications"
      },
      { destination: "/resources/faq", label: "FAQ" }
    ]
  },
  { destination: "/store/", label: "Store" },
  {
    destination: "/about/",
    label: "About Us",
    subheadings: [
      { destination: "/about/whoswho", label: "Who's Who" },
      { destination: "/about/volunteers", label: "Volunteers" }
    ]
  },
  {
    destination: "/members/",
    label: "Membership",
    subheadings: [
      { destination: "/members/membersguide/", label: "Members' Guide" }
    ]
  },
  { destination: "/hopejohnsonaward", label: "Awards" },
  { destination: "/privacypolicy/", label: "Privacy Policy" }
];

const $$Astro$3 = createAstro();
const $$NavMenuDesktop = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$NavMenuDesktop;
  const pathName = new URL(Astro2.request.url).pathname;
  const matchesDestination = (destination) => {
    return pathMatchesDestination(pathName, destination);
  };
  return renderTemplate`${maybeRenderHead()}<nav data-astro-cid-thwrvlys> <ul data-astro-cid-thwrvlys> ${links.map(({ destination, label, subheadings }) => renderTemplate`<li${addAttribute(
    "nav-li" + (matchesDestination(destination) ? " active" : ""),
    "class"
  )} data-astro-cid-thwrvlys> <a class="reset-link-style"${addAttribute(destination, "href")} data-astro-cid-thwrvlys>${label}</a> ${subheadings && renderTemplate`<div class="subheadings" data-astro-cid-thwrvlys> <ul class="subheadings-ul" data-astro-cid-thwrvlys> ${subheadings.map(
    ({
      destination: subDestination,
      label: subLabel
    }) => {
      return renderTemplate`<li${addAttribute(
        "nav-li-subheading" + (matchesDestination(
          subDestination
        ) ? " active" : ""),
        "class"
      )} data-astro-cid-thwrvlys> <a class="reset-link-style"${addAttribute(subDestination, "href")} data-astro-cid-thwrvlys> ${subLabel} </a> </li>`;
    }
  )} </ul> </div>`} </li>`)} </ul> </nav> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/NavMenuDesktop.astro", void 0);

const $$Astro$2 = createAstro();
const $$NavMenuMobile = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NavMenuMobile;
  const path = new URL(Astro2.request.url).pathname;
  const matchesDestination = (destination) => {
    return pathMatchesDestination(path, destination);
  };
  return renderTemplate`${maybeRenderHead()}<ul data-astro-cid-cdlksnks> ${links.map(({ destination, label, subheadings }) => {
    const classList = [];
    if (subheadings) {
      classList.push("subheadings-present");
    }
    return renderTemplate`<details data-astro-cid-cdlksnks> <summary${addAttribute(classList, "class:list")} data-astro-cid-cdlksnks> <a${addAttribute(
      matchesDestination(destination) ? ["active", "reset-link-style"] : ["reset-link-style"],
      "class:list"
    )}${addAttribute(destination, "href")} data-astro-cid-cdlksnks> ${label} </a> </summary> ${subheadings && renderTemplate`<ul data-astro-cid-cdlksnks> ${subheadings.map(
      ({
        destination: subDestination,
        label: subLabel
      }) => renderTemplate`<li${addAttribute(
        matchesDestination(subDestination) ? ["active"] : [],
        "class:list"
      )} data-astro-cid-cdlksnks> <a class="reset-link-style"${addAttribute(subDestination, "href")} data-astro-cid-cdlksnks>${subLabel}</a> </li>`
    )} </ul>`} </details>`;
  })} </ul> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/NavMenuMobile.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <div id="logo-titles" data-astro-cid-3ef6ksr2> <div id="top-component" data-astro-cid-3ef6ksr2> <div id="titles" data-astro-cid-3ef6ksr2> <h1 class="main-heading" data-astro-cid-3ef6ksr2>Alberta Palaeontological Society</h1> <h2 class="secondary-heading" data-astro-cid-3ef6ksr2>
The Meeting Place for Amateur and Professional
					Palaeontologists
</h2> </div> </div> <div id="other-logos" data-astro-cid-3ef6ksr2> <a class="reset-link-style" href="/" data-astro-cid-3ef6ksr2> <img src="/logos/aps-logo.gif" alt="Alberta Palaeontological Society Logo" class="logo" data-astro-cid-3ef6ksr2> </a> <a class="reset-link-style" href="https://www.cspg.org/" data-astro-cid-3ef6ksr2> <img src="/logos/CEGA_logo.png" alt="Canadian Energy Geoscience Association Logo" class="logo" data-astro-cid-3ef6ksr2> </a> <a class="reset-link-style" href="https://www.mtroyal.ca/" data-astro-cid-3ef6ksr2> <img src="/logos/MRU_logo1.png" alt="Mount Royal Univerity Logo" class="logo" data-astro-cid-3ef6ksr2> </a> </div> </div> <!-- Main section for the mobile / hamburger menu --> <!-- Hidden input for the hamburger menu --> <input type="checkbox" id="hamburger-input" data-astro-cid-3ef6ksr2> <label for="hamburger-input" id="hamburger-menu" data-astro-cid-3ef6ksr2> <div id="hamburger-header-components" data-astro-cid-3ef6ksr2> <div id="hamburger-icon" data-astro-cid-3ef6ksr2> <span class="hamburger-line line1" data-astro-cid-3ef6ksr2></span> <span class="hamburger-line line2" data-astro-cid-3ef6ksr2></span> <span class="hamburger-line line3" data-astro-cid-3ef6ksr2></span> </div> <h1 id="sidebar-h1" class="main-heading" data-astro-cid-3ef6ksr2>
Alberta Palaeontological Society
</h1> </div> <nav id="sidebar-menu" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "NavMenuMobile", $$NavMenuMobile, { "data-astro-cid-3ef6ksr2": true })} </nav> </label> <div class="overlay" data-astro-cid-3ef6ksr2></div> </header> <div id="desktop-nav-menu" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "NavMenuDesktop", $$NavMenuDesktop, { "data-astro-cid-3ef6ksr2": true })} </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$SocialsLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SocialsLinks;
  const { size = 1 } = Astro2.props;
  const $$definedVars = defineStyleVars([{ size }]);
  return renderTemplate`${maybeRenderHead()}<div id="socials-container" data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> <a class="reset-link-style"${addAttribute(SOCIAL_MEDIA_LINKS.mastodon, "href")} rel="me" data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> <img class="socials-logo" src="/logos/socials/mastodon-logo-purple.svg" alt="Mastodon Logo" data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> </a> <a class="reset-link-style"${addAttribute(SOCIAL_MEDIA_LINKS.bsky, "href")} data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> <img class="socials-logo" src="/logos/socials/bluesky_media_kit_logo_transparent_1.png" alt="Bluesky Logo" data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> </a> <a class="reset-link-style"${addAttribute(SOCIAL_MEDIA_LINKS.instagram, "href")} data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> <img class="socials-logo" src="/logos/socials/Instagram_Glyph_Gradient.png" alt="Instgram Logo" data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> </a> <a class="reset-link-style"${addAttribute(SOCIAL_MEDIA_LINKS.facebook, "href")} data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> <img class="socials-logo" src="/logos/socials/Facebook_Logo_Primary.png" alt="Facebook Logo" data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> </a> <a class="reset-link-style"${addAttribute(SOCIAL_MEDIA_LINKS.youtube, "href")} data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> <img class="socials-logo" src="/logos/socials/youtube_social_icon_red.png" alt="Facebook Logo" data-astro-cid-rhilnxwy${addAttribute($$definedVars, "style")}> </a> </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/SocialsLinks.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> ${renderComponent($$result, "SocialsLinks", $$SocialsLinks, { "data-astro-cid-sz7xmlte": true })} <p data-astro-cid-sz7xmlte>&copy; ${thisYear} - Alberta Palaeontological Society</p> </footer> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const defaultTitle = "APS";
  const { title = defaultTitle, subtitle } = Astro2.props;
  const formattedTitle = `${title}${subtitle ? ` | ${subtitle}` : ""}`;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Discover amateur palaeontology in Alberta and the society that supports it"><meta name="keywords" content="Alberta Palaeontological Society, Southern Alberta, Alberta, Calgary, Palaeontology, Paleontology, Palaeontology, Fossil, Fossils, Dinosaurs, Dinosaur Hunting, Preservation, digs, Digging, Science, Geology, Meeting, Meetings, Guide to Vertebrate Fossils from the Cretaceous of Alberta, Vertebrate Fossils, Hope Johnson, Hope Johnson drawings, Invertebrate fossils, Plant fossils, Amateur Paleontology, Amateur Palaeontology, Fossil Club, Amateur Palaeontology"><meta name="last-modified"', '><meta name="viewport" content="width=device-width"><link rel="icon" href="/logos/aps-logo.gif"><meta name="generator"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"><script src="/scripts/calendarNav.js" defer><\/script><title>', "</title>", "</head> <body> ", ' <div id="main"> <main> ', " </main> </div> ", " </body></html>"])), addAttribute((/* @__PURE__ */ new Date()).toUTCString(), "content"), addAttribute(Astro2.generator, "content"), formattedTitle, renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$SocialsLinks as a };
