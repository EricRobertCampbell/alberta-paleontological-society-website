const APS_FACEBOOK_LINK = "http://www.facebook.com/albertapaleosociety/";
const APS_YOUTUBE_LINK = "https://www.youtube.com/@AlbertaPaleo";
const APS_INSTAGRAM_LINK = "https://www.instagram.com/alberta_palaeo_society/";
const APS_MASTODON_LINK = "https://sauropods.win/@alberta_palaeo_society";
const APS_BSKY_LINK = "https://bsky.app/profile/abpalaeosociety.bsky.social";
const SOCIAL_MEDIA_LINKS = {
  facebook: APS_FACEBOOK_LINK,
  youtube: APS_YOUTUBE_LINK,
  instagram: APS_INSTAGRAM_LINK,
  mastodon: APS_MASTODON_LINK,
  bsky: APS_BSKY_LINK
};
const APS_HOST_NAME = "APS";
const people = {
  cory: {
    name: "Cory Gross",
    telephone: "(403) 617-2079"
  },
  emily: {
    name: "Emily Bamforth",
    telephone: "(587) 771-0662"
  },
  mona: {
    name: "Mona Trick",
    telephone: "(587) 578-4579"
  },
  vaclav: {
    name: "Vaclav Marsovsky",
    telephone: "(403) 547-0182"
  },
  wayne: {
    name: "Wayne Braunberger",
    telephone: "(403) 278-5154"
  },
  howard: {
    name: "Howard Allen",
    telephone: "(403) 274-1858"
  },
  georgia: {
    name: "Georgia Hoffman",
    telephone: "(403) 228-7729"
  },
  virginia: {
    name: "Virginia Goodman",
    telephone: "(403) 256-7007"
  },
  matthew: {
    name: "Matthew Rhodes"
  },
  walter: {
    name: "Walter DiMattia"
  },
  eric: {
    name: "Eric Campbell",
    telephone: "(587) 226-6980"
  },
  daegan: {
    name: "Daegan Kovacs"
  }
};
const roles = {
  president: {
    ...people.cory,
    email: "president1@albertapaleo.org"
  },
  vicePresident: {
    ...people.emily,
    email: "vicepres@albertapaleo.org"
  },
  treasurer: {
    ...people.mona,
    email: "giftshop@albertapaleo.org"
  },
  secretary: {
    ...people.vaclav
  },
  pastPresident: {
    ...people.wayne,
    email: "pastpres@albertapaleo.org"
  },
  editor: {
    ...people.matthew,
    email: "editor2@albertapaleo.org"
  },
  membership: {
    ...people.daegan,
    email: "membership@albertapaleo.org"
  },
  programCoordinator: {
    ...people.walter,
    email: "programs1@albertapaleo.org"
  },
  fieldTripCoordinator: {
    ...people.eric,
    email: "fieldtrips@albertapaleo.org"
  },
  fossilCollection: {
    ...people.howard,
    email: "editor2@albertapaleo.org"
  },
  librarian: {
    ...people.georgia
  },
  social: {
    ...people.virginia
  },
  publicOutreach: {
    ...people.cory,
    email: "educate@albertapaleo.org"
  },
  webmaster: {
    ...people.eric,
    email: "webmaster@albertapaleo.org"
  },
  symposium: {
    ...people.mona,
    email: "symposium@albertapaleo.org"
  },
  giftShop: {
    ...people.mona,
    email: "giftshop@albertapaleo.org"
  }
};

export { APS_HOST_NAME as A, SOCIAL_MEDIA_LINKS as S, roles as r };
