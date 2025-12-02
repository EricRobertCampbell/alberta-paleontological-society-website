import { c as createComponent, b as createAstro, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CIWrSEVh.mjs';
import { $ as $$HeadingWithBackground } from '../../chunks/HeadingWithBackground_CCNCKZ-l.mjs';
import { $ as $$EmailLink } from '../../chunks/EmailLink_BIFLqf3C.mjs';
import { $ as $$PhoneLink } from '../../chunks/PhoneLink_BkR0mjPD.mjs';
/* empty css                                      */
import { r as roles } from '../../chunks/constants_gZothmyh.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$WhosWhoPersonRow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$WhosWhoPersonRow;
  const { title, person } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<tr data-astro-cid-l4pwikam> <td data-astro-cid-l4pwikam>${title}</td> <td data-astro-cid-l4pwikam>${person.name}</td> <td data-astro-cid-l4pwikam> ${person.email && renderTemplate`${renderComponent($$result, "EmailLink", $$EmailLink, { "email": person.email, "data-astro-cid-l4pwikam": true })}`} </td> <td data-astro-cid-l4pwikam> ${person.telephone && renderTemplate`${renderComponent($$result, "PhoneLink", $$PhoneLink, { "number": person.telephone, "data-astro-cid-l4pwikam": true })}`} </td> </tr> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/WhosWhoPersonRow.astro", void 0);

const $$Astro = createAstro();
const $$WhosWhoPersonCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WhosWhoPersonCard;
  const { person, title } = Astro2.props;
  const { name, email, telephone } = person;
  return renderTemplate`${maybeRenderHead()}<div data-astro-cid-mypezfvs> <h3 data-astro-cid-mypezfvs> ${title} </h3> <h4 data-astro-cid-mypezfvs> ${name} </h4> <ul data-astro-cid-mypezfvs> ${email && renderTemplate`<li data-astro-cid-mypezfvs>
Email: ${renderComponent($$result, "EmailLink", $$EmailLink, { "email": email, "data-astro-cid-mypezfvs": true })} </li>`} ${telephone && renderTemplate`<li data-astro-cid-mypezfvs>
Telephone: ${renderComponent($$result, "PhoneLink", $$PhoneLink, { "number": telephone, "data-astro-cid-mypezfvs": true })} </li>`} </ul> </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/WhosWhoPersonCard.astro", void 0);

const prerender = true;
const $$Whoswho = createComponent(($$result, $$props, $$slots) => {
  const executive = [
    { title: "President", person: roles.president },
    { title: "Vice President", person: roles.vicePresident },
    { title: "Treasurer", person: roles.treasurer },
    { title: "Secretary", person: roles.secretary },
    { title: "Past President", person: roles.pastPresident }
  ];
  const directors = [
    { title: "Editor", person: roles.editor },
    { title: "Membership", person: roles.membership },
    { title: "Program Co-Ordinator", person: roles.programCoordinator },
    { title: "Field Trip Co-Ordinator", person: roles.fieldTripCoordinator }
  ];
  const committees = [
    { title: "Fossil Collection", person: roles.fossilCollection },
    { title: "Librarian", person: roles.librarian },
    { title: "Social", person: roles.social },
    { title: "Public Outreach / Education", person: roles.publicOutreach },
    { title: "Website", person: roles.webmaster },
    { title: "APS Symposium", person: roles.symposium }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "subtitle": "Who's Who?", "data-astro-cid-lyldw7ky": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/headingBackgrounds/upperKananaskisShale1.jpg", "data-astro-cid-lyldw7ky": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-lyldw7ky>Who's Who?</h1> ` })} <p data-astro-cid-lyldw7ky>
Welcome to the "Who's Who" page of the Alberta Palaeontological Society!
		Here, you'll discover the dedicated individuals who drive our society's
		mission forward. The following includes our passionate directors and
		committee heads, each contributing their unique expertise and enthusiasm
		to the world of palaeontology.
</p> <p data-astro-cid-lyldw7ky>
We're always eager to expand our team and welcome fresh perspectives. If
		you share our love for palaeontology and want to be a part of our
		exciting journey, consider <a href="/about/volunteers/" data-astro-cid-lyldw7ky>joining us as a volunteer!</a> By becoming a part of the Alberta Palaeontological Society, you'll have
		the chance to make a meaningful impact and contribute to the fascinating
		world of prehistoric discovery.
</p> <section data-astro-cid-lyldw7ky> <h2 data-astro-cid-lyldw7ky>Executive</h2> <div class="mobile" data-astro-cid-lyldw7ky> ${executive.map(({ title, person }) => {
    return renderTemplate`${renderComponent($$result2, "WhosWhoPersonCard", $$WhosWhoPersonCard, { "title": title, "person": person, "data-astro-cid-lyldw7ky": true })}`;
  })} </div> <table class="desktop" data-astro-cid-lyldw7ky> <thead data-astro-cid-lyldw7ky> <tr data-astro-cid-lyldw7ky> <th scope="column" data-astro-cid-lyldw7ky> Title</th> <th scope="column" data-astro-cid-lyldw7ky> Name</th> <th scope="column" data-astro-cid-lyldw7ky> Email</th> <th scope="column" data-astro-cid-lyldw7ky> Telephone</th> </tr> </thead> <tbody data-astro-cid-lyldw7ky> ${executive.map(({ title, person }) => {
    return renderTemplate`${renderComponent($$result2, "WhosWhoPersonRow", $$WhosWhoPersonRow, { "title": title, "person": person, "data-astro-cid-lyldw7ky": true })}`;
  })} </tbody> </table> </section> <section data-astro-cid-lyldw7ky> <h2 data-astro-cid-lyldw7ky>Directors</h2> <table class="desktop" data-astro-cid-lyldw7ky> <thead data-astro-cid-lyldw7ky> <tr data-astro-cid-lyldw7ky> <th scope="column" data-astro-cid-lyldw7ky> Title</th> <th scope="column" data-astro-cid-lyldw7ky> Name</th> <th scope="column" data-astro-cid-lyldw7ky> Email</th> <th scope="column" data-astro-cid-lyldw7ky> Telephone</th> </tr> </thead> <tbody data-astro-cid-lyldw7ky> ${directors.map(({ title, person }) => {
    return renderTemplate`${renderComponent($$result2, "WhosWhoPersonRow", $$WhosWhoPersonRow, { "title": title, "person": person, "data-astro-cid-lyldw7ky": true })}`;
  })} </tbody> </table> <div class="mobile" data-astro-cid-lyldw7ky> ${directors.map(({ title, person }) => {
    return renderTemplate`${renderComponent($$result2, "WhosWhoPersonCard", $$WhosWhoPersonCard, { "title": title, "person": person, "data-astro-cid-lyldw7ky": true })}`;
  })} </div> </section> <section data-astro-cid-lyldw7ky> <h2 data-astro-cid-lyldw7ky>Committees</h2> <table class="desktop" data-astro-cid-lyldw7ky> <thead data-astro-cid-lyldw7ky> <tr data-astro-cid-lyldw7ky> <th scope="column" data-astro-cid-lyldw7ky> Title</th> <th scope="column" data-astro-cid-lyldw7ky> Name</th> <th scope="column" data-astro-cid-lyldw7ky> Email</th> <th scope="column" data-astro-cid-lyldw7ky> Telephone</th> </tr> </thead> <tbody data-astro-cid-lyldw7ky> ${committees.map(({ title, person }) => {
    return renderTemplate`${renderComponent($$result2, "WhosWhoPersonRow", $$WhosWhoPersonRow, { "title": title, "person": person, "data-astro-cid-lyldw7ky": true })}`;
  })} </tbody> </table> <div class="mobile" data-astro-cid-lyldw7ky> ${committees.map(({ title, person }) => {
    return renderTemplate`${renderComponent($$result2, "WhosWhoPersonCard", $$WhosWhoPersonCard, { "title": title, "person": person, "data-astro-cid-lyldw7ky": true })}`;
  })} </div> </section> ` })} `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/about/whoswho.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/about/whoswho.astro";
const $$url = "/about/whoswho";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Whoswho,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
