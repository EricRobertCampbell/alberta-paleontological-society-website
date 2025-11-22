import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_DUFFj7ww.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_BIFLqf3C.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const prerender = true;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const internalNavLinks = [
    {
      title: "Speaker Schedule",
      id: "speaker-schedule"
    },
    {
      title: "Call for Presentations",
      id: "call-for-presentations"
    },
    {
      title: "Workshops",
      id: "workshops"
    },
    {
      title: "Registration",
      id: "registration"
    },
    {
      title: "Previous Symposia",
      id: "previous-symposia"
    }
  ];
  const schedule = [
    {
      time: "9:00 \u2013 9:15 am",
      title: ["Opening Statements", "Symposium Introduction"],
      speaker: ["Cory Gross, APS President", "Mona Trick, APS Symposium Chair"],
      type: "special"
    },
    {
      time: "9:15 \u2013 10:15 am",
      title: "Tracing Faunal and Environmental Changes Through Time: The Palaeontological Power of Fish Microvertebrate Fossils",
      speaker: "Dr. Julien Divay, Palaeoichthyologist, Hon. Research Associate \u2013 Royal Tyrrell Museum of Palaeontology",
      type: "presentation"
    },
    {
      time: "10:15 \u2013 10:30 am",
      title: "Coffee break",
      type: "break"
    },
    {
      time: "10:30 \u2013 11:30 am",
      title: "Fishes in a Suit of Armour - The Story of Placoderms, One of Our Oldest Jawed Relatives",
      speaker: "Dr. Melina Jobbins, Palaeobiologist, University of Manitoba",
      type: "presentation"
    },
    {
      time: "11:30 \u2013 12:00 pm",
      title: "The Impact of Heavy Industry on Significant Discoveries of Fossil Marine Reptiles in Alberta",
      speaker: "Darren H. Tanke, Senior Technician II, Royal Tyrrell Museum of Palaeontology, Drumheller, Alberta",
      type: "presentation"
    },
    {
      time: "12:00 \u2013 1:00 pm",
      title: "Lunch break",
      type: "break"
    },
    {
      time: "1:00 \u2013 1:30 pm",
      title: "The Driftwood Canyon Fossil Beds, Smithers, Northern British Columbia - An Amazing Well-Preserved and Highly Diverse Eocene-age Terrestrial Paleoecology",
      speaker: "Tako Koning, P. Geol, Senior Geologist - Consultant",
      type: "presentation"
    },
    {
      time: "1:30 \u2013 2:00 pm",
      title: "Left Behind: Previously Unrecognized Trace Fossils with Stories to Tell",
      speaker: "Dr. Jon Noad, Stantec Consulting; University of Adelaide",
      type: "presentation"
    },
    {
      time: "2:00 \u2013 3:00 pm",
      title: "Posters & Displays Breakout Session and coffee break",
      type: "break",
      note: "Poster presenters are requested to be with their posters"
    },
    {
      time: "3:00 \u2013 3:30 pm",
      title: "Alberta's Paleocene Insects: New Insights from a Fossil Legacy",
      speaker: "Kano Sasaguchi, Department of Biological Sciences, University of Alberta",
      type: "presentation"
    },
    {
      time: "3:30 \u2013 4:30 pm",
      title: "Three-Horned Faceoff: A Tale of Canadian Triceratops and Why They Matter",
      speaker: "Dr. Emily Bamforth, Curator, Philip J. Currie Dinosaur Museum",
      type: "presentation"
    },
    {
      time: "4:30 pm",
      title: "Closing Remarks for Paleo 2026",
      speaker: "Mona Trick, APS Symposium Chair",
      type: "special"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Symposium 2026", "data-astro-cid-dluaas3q": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/uofaMuseum1.jpg", "data-astro-cid-dluaas3q": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-dluaas3q>Alberta Paleontological Society Symposium 2026</h1> ` })} <h2 data-astro-cid-dluaas3q>Paleo 2026 - APS Symposium 2026</h2> <p class="subtitle" data-astro-cid-dluaas3q>Saturday, March 14 &mdash; Sunday, March 15, 2026</p> <p class="subtitle" data-astro-cid-dluaas3q>
Mount Royal University, Calgary, Alberta
</p> <p data-astro-cid-dluaas3q>
Planning is underway for the 29<sup data-astro-cid-dluaas3q>th</sup> annual Alberta Palaeontological Society Symposium! 
		Details about the date, venue, and program will be announced as they become available.
</p> <p data-astro-cid-dluaas3q>
This symposium will continue our tradition of featuring presentations from a mix of amateur and 
		professional palaeontologists. The aim is to showcase palaeontology to the general public and 
		to provide an opportunity for contact between the Alberta Palaeontological Society, industry, 
		government and educational facilities.
</p> <nav id="internal-nav" data-astro-cid-dluaas3q> <ul data-astro-cid-dluaas3q> ${internalNavLinks.map(({ title, id }) => renderTemplate`<li data-astro-cid-dluaas3q><a class="reset-link-style"${addAttribute(`#${id}`, "href")} data-astro-cid-dluaas3q> <span data-astro-cid-dluaas3q> ${title} </span> </a></li>`)} </ul> </nav> <section id="speaker-schedule" data-astro-cid-dluaas3q> <h3 data-astro-cid-dluaas3q>Speaker Schedule</h3> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Paleo 2026, March 14, 2026</strong></p> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Jenkins Theatre, Main Building Level 1 (lower level), Mount Royal University</strong></p> <div class="schedule-container" data-astro-cid-dluaas3q> ${schedule.map((item) => renderTemplate`<div${addAttribute(`schedule-item schedule-item--${item.type || "presentation"}`, "class")} data-astro-cid-dluaas3q> <div class="schedule-time" data-astro-cid-dluaas3q>${item.time}</div> <div class="schedule-content" data-astro-cid-dluaas3q> ${Array.isArray(item.title) ? item.title.map((title, idx) => renderTemplate`<div class="schedule-title-group" data-astro-cid-dluaas3q> <div class="schedule-title" data-astro-cid-dluaas3q>${title}</div> ${item.speaker && Array.isArray(item.speaker) && renderTemplate`<div class="schedule-speaker" data-astro-cid-dluaas3q>${item.speaker[idx]}</div>`} </div>`) : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-dluaas3q": true }, { "default": ($$result3) => renderTemplate` <div class="schedule-title" data-astro-cid-dluaas3q>${item.title}</div> ${item.speaker && renderTemplate`<div class="schedule-speaker" data-astro-cid-dluaas3q>${item.speaker}</div>`}` })}`} ${item.note && renderTemplate`<div class="schedule-note" data-astro-cid-dluaas3q>${item.note}</div>`} </div> </div>`)} </div> </section>  <section id="call-for-presentations" data-astro-cid-dluaas3q> <h3 data-astro-cid-dluaas3q>
Call for Presentations
</h3> <p data-astro-cid-dluaas3q>
We are now accepting submissions for presentations and posters for Paleo 2026! 
			If you are an avocational or professional palaeontologist with research to share, 
			we would love to hear from you.
</p> <p data-astro-cid-dluaas3q>
Submission guidelines and deadlines will be posted here as they become available. 
			For early inquiries, please contact us at ${renderComponent($$result2, "EmailLink", $$EmailLink, { "email": "symposium@albertapaleo.org", "subject": "Paleo 2026 Presentation Inquiry", "data-astro-cid-dluaas3q": true })}.
</p> </section> <section id="workshops" data-astro-cid-dluaas3q> <h3 data-astro-cid-dluaas3q>
Workshops
</h3> <p data-astro-cid-dluaas3q>We have two exciting workshops this year!</p> <h4 data-astro-cid-dluaas3q>Early Vertebrate Fossil Identification and Anatomy – what does it tell us about our own evolution?</h4> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Date:</strong> Sunday, March 15, 2026</p> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Location:</strong> Room B140, Main Building Level 1 (lower level), Mount Royal University</p> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Time:</strong> 9:00 am – 12:00 pm</p> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Fee:</strong> $10.00 per person (no GST charged)</p> <h5 data-astro-cid-dluaas3q>Registration</h5> <p data-astro-cid-dluaas3q>
Registration will open January 1, 2026. Please check back then for more details!
</p> <h5 data-astro-cid-dluaas3q>Presenter</h5> <p data-astro-cid-dluaas3q>Dr. Melina Jobbins, Palaeobiologist, Postdoctoral Fellow – University of Manitoba</p> <h5 data-astro-cid-dluaas3q>Description</h5> <p data-astro-cid-dluaas3q>
Early vertebrates consist of the first vertebrate groups to have evolved in life's history. They include fossil armoured jawless and jawed fishes, as well as bony and cartilaginous fishes that lived from the Ordovician to the end of the Devonian primarily. Together, these groups are witnesses to the early steps in vertebrate evolution, including the origin of bone, a differentiated skeleton with fins, jaws and teeth, and the transition from water to land through adaptations like lungs and limbs. All these steps were key contributors to the success of this group, allowing vertebrates to rapidly diversify their diets and feeding strategies, colonize new environments, and fill new ecological niches. By doing so, they flourished rapidly soon after their origin to, further down the line, give rise to amphibians, reptiles, birds, and mammals like us. Thus, learning about early vertebrates allows us to understand more about our own origins and early evolution.
</p> <p data-astro-cid-dluaas3q>
In this workshop, participants will 1) get an introduction to the different early vertebrate groups, 2) get hands-on experience with specimens (fossils and 3D prints) and comparative material, 3) learn identification tools related to the material at hand and discuss their advantages vs limitations for both the given material and overall, 4) learn how the mode of preservation affects the amount of knowledge that can be extracted from a fossil.
</p> <h5 data-astro-cid-dluaas3q>Suggested items to bring</h5> <ul data-astro-cid-dluaas3q> <li data-astro-cid-dluaas3q>Preferred means for taking pictures of fossils</li> <li data-astro-cid-dluaas3q>Microscopes may also be used so also think of your preferred means for taking pictures through a microscope lens</li> <li data-astro-cid-dluaas3q>Notepad and pen/pencil for taking notes and making sketches</li> </ul> <h4 data-astro-cid-dluaas3q>Microvertebrate Fish Fossil Identification and Interpretation to Reconstruct Faunal and Environmental Changes</h4> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Date:</strong> Sunday, March 15, 2026</p> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Location:</strong> Room B140, Main Building Level 1 (lower level), Mount Royal University</p> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Time:</strong> 1:00 pm – 4:00 pm</p> <p data-astro-cid-dluaas3q><strong data-astro-cid-dluaas3q>Fee:</strong> $10.00 per person (no GST charged)</p> <h5 data-astro-cid-dluaas3q>Registration</h5> <p data-astro-cid-dluaas3q>
Registration will open January 1, 2026. Please check back then for more details!
</p> <h5 data-astro-cid-dluaas3q>Presenter</h5> <p data-astro-cid-dluaas3q>Dr. Julien Divay, Palaeoichthyologist, Hon. Research Associate – Royal Tyrrell Museum of Palaeontology</p> <h5 data-astro-cid-dluaas3q>Description</h5> <p data-astro-cid-dluaas3q>
Fish microvertebrate fossils—including teeth, scales, and bone fragments—are valuable tools in palaeontological and geological research that are often abundant in sedimentary basins. They represent the best evidence of the past diversity of local faunas, enabling us to reconstruct aquatic ecosystems, time turnover events, track evolutionary changes, and time phylogenetic divergences in fish lineages. Their abundance and diversity also make them excellent sources of palaeobiogeographic information, useful for determining hydrological connections between drainage basins and for dating dispersal events. Additionally, local fish diversities can indicate past environmental conditions such as water temperature, salinity, and habitat type. Thus, fish microvertebrate fossils provide crucial insights into palaeoecology, palaeoclimate, and the geological history of aquatic environments.
</p> <p data-astro-cid-dluaas3q>
In this workshop, participants will 1) get hands-on experience with specimens and comparative material, 2) learn and discuss identification features and techniques as well as the particular challenges represented by working with this material, 3) learn field and lab methods used to collect and prepare this material, 4) learn how to document morphologies appropriately, 5) learn methods used to interpret and compare assemblages, and 6) learn about future potential avenues for this research.
</p> <h5 data-astro-cid-dluaas3q>Suggested items to bring</h5> <ul data-astro-cid-dluaas3q> <li data-astro-cid-dluaas3q>Microvertebrate fossil-sorting equipment – e.g., picks, tweezers, fine paint brushes, etc. However, tweezers can be provided for you, if desired.</li> <li data-astro-cid-dluaas3q>Note pad and pen for taking notes/making sketches.</li> <li data-astro-cid-dluaas3q>Your favourite means of taking pictures of specimens through a microscope lens.</li> </ul> </section> <section id="registration" data-astro-cid-dluaas3q> <h3 data-astro-cid-dluaas3q>
Registration
</h3> <p data-astro-cid-dluaas3q>
Registration details will be announced closer to the symposium date. As with previous years, 
			the event will be free and open to the public, with both in-person and virtual attendance options.
</p> <p data-astro-cid-dluaas3q>
Stay tuned to our website and newsletter for updates on registration opening dates and procedures.
</p> </section> <section id="previous-symposia" data-astro-cid-dluaas3q> <h3 data-astro-cid-dluaas3q>
Previous Symposia
</h3> <p data-astro-cid-dluaas3q>While you wait for Paleo 2026, you can catch up on previous years:</p> <ul data-astro-cid-dluaas3q> <li data-astro-cid-dluaas3q> <a href="/events/symposium/2025" data-astro-cid-dluaas3q>Paleo 2025</a> - Mount Royal University, Calgary
</li> <li data-astro-cid-dluaas3q> <a href="https://www.youtube.com/playlist?list=PLIbLEoMjr_5NJoPQJpN-0VJPJ-xDXMrxO" data-astro-cid-dluaas3q>Paleo 2024</a> - YouTube Playlist
</li> <li data-astro-cid-dluaas3q> <a href="https://www.youtube.com/playlist?list=PLIbLEoMjr_5N6TiqYkZwFSTqoHC13T-WT" data-astro-cid-dluaas3q>Paleo 2023</a> - YouTube Playlist
</li> </ul> <p data-astro-cid-dluaas3q>Thanks to everyone, especially the speakers, who make these events possible!</p> </section> <section data-astro-cid-dluaas3q> <h3 data-astro-cid-dluaas3q>Stay Updated</h3> <p data-astro-cid-dluaas3q>
For the latest information about Paleo 2026, including announcements about dates, venues, 
			and call for papers, please:
</p> <ul data-astro-cid-dluaas3q> <li data-astro-cid-dluaas3q>Check back on this page regularly</li> <li data-astro-cid-dluaas3q>Follow us on social media</li> <li data-astro-cid-dluaas3q>Attend our monthly meetings</li> </ul> </section> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/symposium/index.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/symposium/index.astro";
const $$url = "/events/symposium";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
