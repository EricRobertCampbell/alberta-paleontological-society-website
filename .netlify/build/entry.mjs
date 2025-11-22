import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_5ZdRA_Ok.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about/volunteers.astro.mjs');
const _page3 = () => import('./pages/about/whoswho.astro.mjs');
const _page4 = () => import('./pages/about.astro.mjs');
const _page5 = () => import('./pages/api/fossil-sorting-images.astro.mjs');
const _page6 = () => import('./pages/events/agm/2024.astro.mjs');
const _page7 = () => import('./pages/events/agm/2025.astro.mjs');
const _page8 = () => import('./pages/events/calendar.astro.mjs');
const _page9 = () => import('./pages/events/fieldtrippictures.astro.mjs');
const _page10 = () => import('./pages/events/fieldtrips.astro.mjs');
const _page11 = () => import('./pages/events/fossilsorting/data.astro.mjs');
const _page12 = () => import('./pages/events/fossilsorting/data.json.astro.mjs');
const _page13 = () => import('./pages/events/fossilsorting/images.astro.mjs');
const _page14 = () => import('./pages/events/fossilsorting/slideshow.astro.mjs');
const _page15 = () => import('./pages/events/fossilsorting.astro.mjs');
const _page16 = () => import('./pages/events/monthlymeetings.astro.mjs');
const _page17 = () => import('./pages/events/stable/_slug_.astro.mjs');
const _page18 = () => import('./pages/events/symposium/2025.astro.mjs');
const _page19 = () => import('./pages/events/symposium.astro.mjs');
const _page20 = () => import('./pages/events.astro.mjs');
const _page21 = () => import('./pages/hopejohnsonaward.astro.mjs');
const _page22 = () => import('./pages/interstitial/20250411.astro.mjs');
const _page23 = () => import('./pages/interstitial/20250509.astro.mjs');
const _page24 = () => import('./pages/interstitial/20250919.astro.mjs');
const _page25 = () => import('./pages/interstitial/20251017.astro.mjs');
const _page26 = () => import('./pages/interstitial/20251121.astro.mjs');
const _page27 = () => import('./pages/interstitial/paleo2025.astro.mjs');
const _page28 = () => import('./pages/members/membersguide.astro.mjs');
const _page29 = () => import('./pages/members.astro.mjs');
const _page30 = () => import('./pages/privacypolicy.astro.mjs');
const _page31 = () => import('./pages/resources/bulletin.astro.mjs');
const _page32 = () => import('./pages/resources/bulletinarchives.astro.mjs');
const _page33 = () => import('./pages/resources/faq.astro.mjs');
const _page34 = () => import('./pages/resources/fossilcollection.astro.mjs');
const _page35 = () => import('./pages/resources/library.astro.mjs');
const _page36 = () => import('./pages/resources/links.astro.mjs');
const _page37 = () => import('./pages/resources/opensourcepublications.astro.mjs');
const _page38 = () => import('./pages/resources.astro.mjs');
const _page39 = () => import('./pages/store.astro.mjs');
const _page40 = () => import('./pages/trivia/2024.astro.mjs');
const _page41 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about/volunteers.astro", _page2],
    ["src/pages/about/whoswho.astro", _page3],
    ["src/pages/about/index.astro", _page4],
    ["src/pages/api/fossil-sorting-images.ts", _page5],
    ["src/pages/events/agm/2024.astro", _page6],
    ["src/pages/events/agm/2025.astro", _page7],
    ["src/pages/events/calendar.astro", _page8],
    ["src/pages/events/fieldtrippictures.astro", _page9],
    ["src/pages/events/fieldtrips.astro", _page10],
    ["src/pages/events/fossilsorting/data.astro", _page11],
    ["src/pages/events/fossilsorting/data.json.ts", _page12],
    ["src/pages/events/fossilsorting/images.astro", _page13],
    ["src/pages/events/fossilsorting/slideshow.astro", _page14],
    ["src/pages/events/fossilsorting/index.astro", _page15],
    ["src/pages/events/monthlymeetings.astro", _page16],
    ["src/pages/events/stable/[slug].astro", _page17],
    ["src/pages/events/symposium/2025.astro", _page18],
    ["src/pages/events/symposium/index.astro", _page19],
    ["src/pages/events/index.astro", _page20],
    ["src/pages/hopejohnsonaward.astro", _page21],
    ["src/pages/interstitial/20250411.astro", _page22],
    ["src/pages/interstitial/20250509.astro", _page23],
    ["src/pages/interstitial/20250919.astro", _page24],
    ["src/pages/interstitial/20251017.astro", _page25],
    ["src/pages/interstitial/20251121.astro", _page26],
    ["src/pages/interstitial/paleo2025.astro", _page27],
    ["src/pages/members/membersguide.astro", _page28],
    ["src/pages/members/index.astro", _page29],
    ["src/pages/privacypolicy.astro", _page30],
    ["src/pages/resources/bulletin.astro", _page31],
    ["src/pages/resources/bulletinarchives.astro", _page32],
    ["src/pages/resources/faq.astro", _page33],
    ["src/pages/resources/fossilcollection.astro", _page34],
    ["src/pages/resources/library.astro", _page35],
    ["src/pages/resources/links.astro", _page36],
    ["src/pages/resources/opensourcepublications.astro", _page37],
    ["src/pages/resources/index.astro", _page38],
    ["src/pages/store.astro", _page39],
    ["src/pages/trivia/2024/index.astro", _page40],
    ["src/pages/index.astro", _page41]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "63a5ce06-4217-434d-856c-a893fe835e7f"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
