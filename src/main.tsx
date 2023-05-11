import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Root } from "./components/Root";
import {
  AGM,
  BooksForSale,
  Bulletin,
  BulletinArchive,
  Events,
  FAQ,
  FieldTrips,
  FieldTripPictures,
  Home,
  HopeJohnsonAward,
  Library,
  Links,
  Membership,
  MembersGuide,
  Publications,
  Volunteers,
  WhosWho,
  FossilCollection,
  Restricted,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "meetings", element: <Events /> },
      { path: "agm", element: <AGM /> },
      { path: "hopejohnsonaward", element: <HopeJohnsonAward /> },
      { path: "members", element: <Membership /> },
      { path: "guide3web", element: <MembersGuide /> },
      { path: "fieldtrips", element: <FieldTrips /> },
      { path: "apspict", element: <FieldTripPictures /> },
      { path: "whoswho", element: <WhosWho /> },
      { path: "apsbooks", element: <BooksForSale /> },
      { path: "library", element: <Library /> },
      { path: "fossils", element: <FossilCollection /> },
      { path: "bulletin", element: <Bulletin /> },
      { path: "bulletinarchive", element: <BulletinArchive /> },
      { path: "links", element: <Links /> },
      { path: "volunteers", element: <Volunteers /> },
      { path: "publications", element: <Publications /> },
      { path: "faq", element: <FAQ /> },
      { path: "restricted", element: <Restricted /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-itbptwh0b3ae01w1.us.auth0.com"
      clientId="WLob52hjjKY9WhxiNTEgtadv48N4u38x"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/restricted`,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
