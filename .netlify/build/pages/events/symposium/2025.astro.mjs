import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../../../chunks/HeadingWithBackground_DUFFj7ww.mjs';
import { $ as $$EmailLink } from '../../../chunks/EmailLink_BIFLqf3C.mjs';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

const prerender = true;
const $$2025 = createComponent(($$result, $$props, $$slots) => {
  const internalNavLinks = [
    {
      title: "Speaker Schedule",
      id: "speaker-schedule"
    },
    {
      title: "Workshop",
      id: "workshop"
    },
    {
      title: "Posters",
      id: "posters"
    },
    {
      title: "Previous Symposia",
      id: "previous-symposia"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Symposium 2025", "data-astro-cid-l52zrcbd": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/uofaMuseum1.jpg", "data-astro-cid-l52zrcbd": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-l52zrcbd>Alberta Paleontological Society Symposium 2025</h1> ` })} <h2 data-astro-cid-l52zrcbd>Paleo 2025 - APS Symposium 2025</h2> <p class="subtitle" data-astro-cid-l52zrcbd>Saturday, March 15 &mdash; Sunday, March 16</p> <p class="subtitle" data-astro-cid-l52zrcbd>
Mount Royal University, Calgary, Alberta
</p> <p data-astro-cid-l52zrcbd>
In conjunction with Mount Royal University Earth and Environmental 
	 	Sciences and the CEGA Paleontology Division, we are pleased to announce 
	 	that the 28<sup data-astro-cid-l52zrcbd>th</sup> annual Alberta Palaeontological Society Symposium 
		will take place on Saturday, March 15, 2025 from 9:00AM - 4:30PM. In addition, we will have a workshop on Sunday, March 16, 2025 from 9:00AM - 12:00pm on 3D fossil scanning.
</p> <p data-astro-cid-l52zrcbd>
This symposium will contain presentations from a mix of amateur and 
	 	professional palaeontologists. The aim is to showcase palaeontology to 
	 	the general public and to provide an opportunity for contact between the 
	 	Alberta Palaeontological Society, industry, government and educational 
	 	facilities. The event is free and all are welcome to attend or join 
	 	virtually. Families are encouraged to bring fossils to our 
	 	identification booth where APS members will do their best to provide you 
	 	with information.
</p> <p data-astro-cid-l52zrcbd>
For additional information on all aspects of the symposium, please see the <a href="/symposium/2025/Paleo2025circular.pdf" data-astro-cid-l52zrcbd>APS Paleo 2025 Circular</a>.
</p> <nav id="internal-nav" data-astro-cid-l52zrcbd> <ul data-astro-cid-l52zrcbd> ${internalNavLinks.map(({ title, id }) => renderTemplate`<li data-astro-cid-l52zrcbd><a class="reset-link-style"${addAttribute(`#${id}`, "href")} data-astro-cid-l52zrcbd> <span data-astro-cid-l52zrcbd> ${title} </span> </a></li>`)} </ul> </nav> <section id="speaker-schedule" data-astro-cid-l52zrcbd> <h3 data-astro-cid-l52zrcbd>
Speaker Schedule
</h3> <a id="schedule-download" href="/symposium/2025/Paleo2025SpeakerSchedule.pdf" target="_blank" rel="noopener noreferrer" data-astro-cid-l52zrcbd>Download Schedule</a> <p data-astro-cid-l52zrcbd><strong data-astro-cid-l52zrcbd>All talks will be held in the Jenkins Theatre, Main Building, lower level of Mount Royal University.</strong></p> <table data-astro-cid-l52zrcbd> <tr data-astro-cid-l52zrcbd> <th data-astro-cid-l52zrcbd>Time</th> <th data-astro-cid-l52zrcbd>Sessions</th> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>9:00 - 9:15 am</td> <td data-astro-cid-l52zrcbd>Opening Statements.<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Cory Gross, APS President</em><br data-astro-cid-l52zrcbd>Symposium Introduction.<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Mona Trick, APS Symposium Chair</em></td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>9:15 – 10:15 am</td> <td data-astro-cid-l52zrcbd>Squid Games: Challenges in Ammonite Paleoecology.<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Dr. Cam Tsujita, Department of Earth Sciences, Western University, London, Ontario</em></td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>10:15 – 10:30 am</td> <td data-astro-cid-l52zrcbd>Coffee Break</td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>10:30 – 11:00 am</td> <td data-astro-cid-l52zrcbd>Geographic Area and Body Size Relationships in the Dinosauria
Through the Mesozoic<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Dr. Matthew J. Vavrek, Cutbank Palaeontological Consulting</em></td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>11:00 – 12:00 pm</td> <td data-astro-cid-l52zrcbd>Overview and Update on the Kaskie Hadrosaur Project in Dinosaur Provincial Park.<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Darren H. Tanke, Senior Technician II, Royal Tyrrell Museum of Palaeontology, Drumheller, Alberta</em></td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>12:00 – 1:00 pm</td> <td data-astro-cid-l52zrcbd>Lunch Break</td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>1:00 – 1:30 pm</td> <td data-astro-cid-l52zrcbd>
Joggins Fossils Cliffs, Nova Scotia: A Carboniferous (320-Million-
Years-Old) Highly Diverse Paleoecology and a UNESCO World

Heritage Site <br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>
Tako Koning, Consulting Geologist
</em> </td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>
1:30 – 2:00 pm
</td> <td data-astro-cid-l52zrcbd>
Exploring the Diverse Plant Fossils of the Early Eocene Flora of

Republic, Washington <br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>
Dr. Kathleen Pigg, Professor and Curator of Fossil Plants, BioKIC
(Biodiversity Knowledge Integration Center), School of Life
Sciences, Arizona State University, Tempe Arizona
</em> </td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>2:00 – 3:00 pm</td> <td data-astro-cid-l52zrcbd>Posters &amp; Displays Breakout Session and coffee break.<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Poster presenters are requested to be with their posters.</em></td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>3:00 – 3:30 pm</td> <td data-astro-cid-l52zrcbd>New insights into amphibian anatomy, evolution and ecology from the Paleozoic of Atlantic Canada.<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Dr. Hillary Maddin, Carleton University, Ottawa, Ontario</em></td> </tr> <tr data-astro-cid-l52zrcbd> <td style="vertical-align: top;" data-astro-cid-l52zrcbd>3:30 – 4:30 pm</td> <td style="vertical-align: top;" data-astro-cid-l52zrcbd>Tyrant Lizard Kings and Queens: A Tale of Canadian T. rexes.<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Dr. Emily Bamforth, Philip J. Currie Dinosaur Museum</em> <br data-astro-cid-l52zrcbd> <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: calc(4 * var(--theme-spacing-base)); margin-bottom: calc(2 * var(--theme-spacing-base)); padding-top: calc(2 * var(--theme-spacing-base))" data-astro-cid-l52zrcbd> <a class="reset-link-style" href="https://www.instagram.com/EL_Bamforth/" style="display: flex; flex-direction: row; align-items: center; gap: var(--theme-spacing-base); text-decoration: none;" data-astro-cid-l52zrcbd><img height="25" src="/logos/socials/Instagram_Glyph_Gradient.png" data-astro-cid-l52zrcbd>@EL_Bamforth</a> <a class="reset-link-style" href="https://www.instagram.com/curriemuseum/" style="display: flex; flex-direction: row; align-items: center; gap: var(--theme-spacing-base); text-decoration: none;" data-astro-cid-l52zrcbd><img height="25" src="/logos/socials/Instagram_Glyph_Gradient.png" data-astro-cid-l52zrcbd>@curriemuseum</a> <a class="reset-link-style" href="https://dinomuseum.ca/" style="display: flex; flex-direction: row; align-items: center; gap: var(--theme-spacing-base); text-decoration: none;" data-astro-cid-l52zrcbd><img height="25" src="/logos/website.svg" data-astro-cid-l52zrcbd>Philip J. Currie Dinosaur Museum</a> </div> </td> </tr> <tr data-astro-cid-l52zrcbd> <td data-astro-cid-l52zrcbd>4:30 pm</td> <td data-astro-cid-l52zrcbd>Closing remarks for Paleo 2025.<br data-astro-cid-l52zrcbd><em data-astro-cid-l52zrcbd>Mona Trick, APS Symposium Chair</em></td> </tr> </table> </section> <section id="workshop" data-astro-cid-l52zrcbd> <h3 data-astro-cid-l52zrcbd>
Workshop
</h3> <h4 data-astro-cid-l52zrcbd>3D Imaging of Fossils</h4> <a id="workshop-description-download" target="_blank" rel="noopener noreferrer" href="/symposium/2025/Workshop Description - 3D Imaging of Fossils.pdf" data-astro-cid-l52zrcbd>Download Workshop Description</a> <p data-astro-cid-l52zrcbd><strong data-astro-cid-l52zrcbd>Date:</strong> Sunday, March 16th, 2025</p> <p data-astro-cid-l52zrcbd><strong data-astro-cid-l52zrcbd>Location:</strong> Room B140, Main Building, Mount Royal University</p> <p data-astro-cid-l52zrcbd><strong data-astro-cid-l52zrcbd>Time:</strong> 9:00 am to 12:00 noon</p> <p data-astro-cid-l52zrcbd><strong data-astro-cid-l52zrcbd>Fee:</strong> $20.00 per person (No GST charged)</p> <h5 data-astro-cid-l52zrcbd>Registration</h5> <p data-astro-cid-l52zrcbd>Please register by emailing <a href="mailto:giftshop@albertapaleo.org" data-astro-cid-l52zrcbd>giftshop@albertapaleo.org</a> or register at one of the monthly meetings, or by mailing your cheque to the Society's mailing address at:</p> <p data-astro-cid-l52zrcbd>P.O. Box 68024 Crowfoot PO, Calgary, Alberta, T3G 3N8</p> <p data-astro-cid-l52zrcbd>Pay via cash, cheque, or Interac E-transfer to payee: <a href="mailto:giftshop@albertapaleo.org" data-astro-cid-l52zrcbd>giftshop@albertapaleo.org</a>. Make cheques payable to the Alberta Palaeontological Society. The deadline for registration is March 9, 2025.</p> <p data-astro-cid-l52zrcbd>
The registration form is available for download <a href="/symposium/2025/workshopSignup.pdf" data-astro-cid-l52zrcbd>here</a> and should be submitted with payment.
</p> <h5 data-astro-cid-l52zrcbd>Presenters</h5> <p data-astro-cid-l52zrcbd>Dr. Emily Bamforth and Jackson Sweder (Curator and Head Technician at the Philip J. Currie Dinosaur Museum) and Atharva Roy (APS)</p> <h5 data-astro-cid-l52zrcbd>Description</h5> <p data-astro-cid-l52zrcbd>The use of three-dimensional (3D) imaging technology is becoming widespread in paleontology, having applications for field work, collections management, research, exhibits, and outreach. Much of this technology is now available to the public and easy to use, meaning that anyone with a smartphone, tablet, or laptop can create three-dimensional digital copies of their favorite fossils.</p> <p data-astro-cid-l52zrcbd>In this workshop, participants will:</p> <ul data-astro-cid-l52zrcbd> <li data-astro-cid-l52zrcbd>Learn about the many uses of 3D imaging technology in paleontology.</li> <li data-astro-cid-l52zrcbd>Be introduced to two specific types of 3D imaging: photogrammetry using the MetaScan and PolyCam applications, and 3D surface scanning using a hand-held light scanner.</li> <li data-astro-cid-l52zrcbd>See a demonstration of both types of technology used in real time.</li> <li data-astro-cid-l52zrcbd>Have an opportunity to 3D scan their own fossil.</li> <li data-astro-cid-l52zrcbd>Learn about the editing programs available to make 3D scans into 3D printable files.</li> </ul> <h5 data-astro-cid-l52zrcbd>Suggested Items</h5> <ul data-astro-cid-l52zrcbd> <li data-astro-cid-l52zrcbd>A fossil, ideally 2 cm to 10 cm in length, to 3D image. Note that we will also have some fossils available to try scanning.</li> <li data-astro-cid-l52zrcbd>If participants wish to try photogrammetry on their own devices (smartphones, tablets etc.), we recommend downloading and installing either <a href="https://metascan.ai/" data-astro-cid-l52zrcbd>MetaScan</a> or <a href="https://poly.cam/tools/photogrammetry" data-astro-cid-l52zrcbd>PolyCam</a>. Both applications have a free trial option.</li> <li data-astro-cid-l52zrcbd>Note pad and paper for taking notes.</li> </ul> <p data-astro-cid-l52zrcbd>Registration is limited to 20 participants in each session, so register early.</p> </section> <section id="posters" data-astro-cid-l52zrcbd> <h3 data-astro-cid-l52zrcbd>
Posters
</h3> <p data-astro-cid-l52zrcbd>
The APS invites you to submit a poster for the symposium! If you are
			an avocational or professional palaeontologist and have been doing
			research, we would love for you to submit your poster for the
			symposium. Any area related to palaeontology is suitable. We will post additional information (submission guidelines, deadlines, &amp;c.) soon, but for now if you are interested please email Matthew Rhodes at ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "posters@albertapaleo.org", "subject": "Paleo 2025 Poster Submission", "data-astro-cid-l52zrcbd": true })}.
</p> </section> <section id="previous-symposia" data-astro-cid-l52zrcbd> <h3 data-astro-cid-l52zrcbd>
Previous Symposia
</h3>
For recordings from previous years, please see the following YouTube playlists:
<ul data-astro-cid-l52zrcbd> <li data-astro-cid-l52zrcbd> <a href="https://www.youtube.com/playlist?list=PLIbLEoMjr_5N6TiqYkZwFSTqoHC13T-WT" data-astro-cid-l52zrcbd>Paleo 2023</a> </li> <li data-astro-cid-l52zrcbd> <a href="https://www.youtube.com/playlist?list=PLIbLEoMjr_5NJoPQJpN-0VJPJ-xDXMrxO" data-astro-cid-l52zrcbd>Paleo 2024</a> </li> </ul> <p data-astro-cid-l52zrcbd>Thanks to everyone, epecially the speakers, who make these events possible!</p> </section> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/symposium/2025.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/symposium/2025.astro";
const $$url = "/events/symposium/2025";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$2025,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
