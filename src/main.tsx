import React from "react";
import ReactDOM from "react-dom/client";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
