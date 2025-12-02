import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, r as renderComponent, f as renderScript, a as renderTemplate, F as Fragment } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_BIFLqf3C.mjs';
import { r as roles } from '../../chunks/constants_gZothmyh.mjs';
import { g as getCollection } from '../../chunks/_astro_content_BoddU3be.mjs';
import { $ as $$Button } from '../../chunks/Button_BH0Jhue2.mjs';
/* empty css                                               */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$ThreeDScanDialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ThreeDScanDialog;
  const { accessionNumber, filename, attribution, description, index, total } = Astro2.props;
  const filenameIdentifier = filename.replace(/\./g, "-");
  return renderTemplate`${maybeRenderHead()}<dialog${addAttribute(`three-d-scan-dialog-${filenameIdentifier}`, "id")} data-astro-cid-fuwxapsp> <div id="innerContainer" data-astro-cid-fuwxapsp> <form method="dialog" data-astro-cid-fuwxapsp> ${renderComponent($$result, "Button", $$Button, { "data-astro-cid-fuwxapsp": true }, { "default": ($$result2) => renderTemplate`&#x2715;` })} </form> <h2 data-astro-cid-fuwxapsp>${accessionNumber.toUpperCase()} - ${description}</h2> <canvas data-astro-cid-fuwxapsp></canvas> <p data-astro-cid-fuwxapsp>Attribution: ${attribution}</p> </div> </dialog> ${renderComponent($$result, "Button", $$Button, { "data-identifier": "three-d-scan-open-button", "data-filename": filename, "data-astro-cid-fuwxapsp": true }, { "default": ($$result2) => renderTemplate`
Open${total > 1 ? ` (${index + 1}/${total})` : ""}` })} ${renderScript($$result, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/ThreeDScanDialog.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/ThreeDScanDialog.astro", void 0);

const $$Fossilcollection = createComponent(async ($$result, $$props, $$slots) => {
  const fossils = await getCollection("fossils");
  const { fossilCollection } = roles;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Fossil Collection", "data-astro-cid-pxfdc3mt": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/tinyFossil1.jpg", "data-astro-cid-pxfdc3mt": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h2 data-astro-cid-pxfdc3mt>Fossil Collection</h2> ` })} <p data-astro-cid-pxfdc3mt>
The APS fossil collection includes vertebrates, invertebrates, plants,
		and ichnofossils (tracks), primarily from Alberta, but also from other
		areas of North America. The collection has been in existence since the
		late 1980s.
</p> <p data-astro-cid-pxfdc3mt>
The APS Fossil Collection is available to members for viewing, for
		comparative study in identification of your own fossils or for use in
		educational undertakings. From time to time it is also used for displays
		at the annual APS Symposium and at the Calgary Rock and Lapidary Club
		show.
</p> <p data-astro-cid-pxfdc3mt>
The collection is properly indexed in a database managed by the APS
		Curator.
</p> <p data-astro-cid-pxfdc3mt>
For inquiries about the collection, about the listing of the fossils, or
		access to the collection, please contact the Curator, ${fossilCollection.name} as
		follows:
</p> <address data-astro-cid-pxfdc3mt> <p data-astro-cid-pxfdc3mt> ${fossilCollection.name},
<br data-astro-cid-pxfdc3mt>
c/o Alberta Palaeontological Society
<br data-astro-cid-pxfdc3mt>
P.O. Box 68024, Crowfoot Postal Outlet
<br data-astro-cid-pxfdc3mt>
Calgary, Alberta &nbsp;T3G 3N8
<br data-astro-cid-pxfdc3mt>
Canada
</p> </address> <p data-astro-cid-pxfdc3mt>or</p> <address data-astro-cid-pxfdc3mt> <p data-astro-cid-pxfdc3mt> ${fossilCollection.name} <br data-astro-cid-pxfdc3mt>
7828 Hunterslea Cr., N.W. <br data-astro-cid-pxfdc3mt>
Calgary, Alberta &nbsp;T2K 4M2 <br data-astro-cid-pxfdc3mt>
Canada <br data-astro-cid-pxfdc3mt> ${fossilCollection.telephone && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-pxfdc3mt": true }, { "default": ($$result3) => renderTemplate`Ph. ${fossilCollection.telephone}` })}`} </p> </address> <p data-astro-cid-pxfdc3mt>Viewing must be arranged ahead of time!</p> <p data-astro-cid-pxfdc3mt>
You may also E-mail the editor at${" "} ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "editor2@albertapaleo.org", "data-astro-cid-pxfdc3mt": true })}.
</p> <p data-astro-cid-pxfdc3mt>
Donations are currently not being accepted due to storage limitations.
</p> <h3 data-astro-cid-pxfdc3mt>Digital Collection</h3> <p data-astro-cid-pxfdc3mt>We are working on getting our extensive collections digitized! Please check back here regularly for progress.</p> <p data-astro-cid-pxfdc3mt>For instructions on how to view the 3D scans, please see <a href="https://youtu.be/q0vlIolfglg" data-astro-cid-pxfdc3mt>this video</a>.</p> ${fossils.length > 0 ? renderTemplate`<table data-astro-cid-pxfdc3mt> <thead data-astro-cid-pxfdc3mt> <tr data-astro-cid-pxfdc3mt> <th scope="col" data-astro-cid-pxfdc3mt>Accession Number</th> <th scope="col" data-astro-cid-pxfdc3mt>Description</th> <th scope="col" data-astro-cid-pxfdc3mt>
Identification
</th> <th scope="col" data-astro-cid-pxfdc3mt>
Formation
</th> <th scope="col" data-astro-cid-pxfdc3mt>
Time Span
</th> <th scope="col" data-astro-cid-pxfdc3mt>
Locality
</th> <th scope="col" data-astro-cid-pxfdc3mt>Scans</th> </tr> </thead> <tbody data-astro-cid-pxfdc3mt> ${fossils.map((fossil) => renderTemplate`<tr data-astro-cid-pxfdc3mt> <td data-astro-cid-pxfdc3mt>${fossil.id.toUpperCase()}</td> <td data-astro-cid-pxfdc3mt>${fossil.data.description}</td> <td data-astro-cid-pxfdc3mt>${fossil.data.identification || "Unknown"}</td> <td data-astro-cid-pxfdc3mt>${fossil.data.formation || "Unknown"}</td> <td data-astro-cid-pxfdc3mt>${fossil.data.timespan || "Unknown"}</td> <td data-astro-cid-pxfdc3mt>${fossil.data.locality || "Unknown"}</td> <td data-astro-cid-pxfdc3mt>${(fossil.data.threeDScans || []).map((scan, index, allScans) => renderTemplate`${renderComponent($$result2, "ThreeDScanDialog", $$ThreeDScanDialog, { "accessionNumber": fossil.id, "filename": scan.filename, "attribution": scan.attribution, "description": fossil.data.description, "index": index, "total": allScans.length, "data-astro-cid-pxfdc3mt": true })}`)}</td> </tr>`)} </tbody> </table>` : null}` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/fossilcollection.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/resources/fossilcollection.astro";
const $$url = "/resources/fossilcollection";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Fossilcollection,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
