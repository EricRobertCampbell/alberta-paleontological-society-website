import { Link } from "react-router-dom";

const links: Array<{ path: string; name: string }> = [
  { path: "/", name: "Home" },
  { path: "meetings", name: "Meetings / Events" },
  { path: "agm", name: "Annual General Meeting" },
  { path: "hopejohnsonaward", name: "Hope Johnson Award" },
  { path: "members", name: "Membership" },
  { path: "guide3web", name: "Member's Guide" },
  { path: "fieldtrips", name: "Field Trips" },
  { path: "apspict", name: "Field Trip Pictures" },
  { path: "whoswho", name: "Who's Who" },
  { path: "apsbooks", name: "APS Books For Sale" },
  { path: "library", name: "APS Library" },
  { path: "fossils", name: "APS Fossil Collection" },
  { path: "bulletin", name: "APS Bulletin" },
  { path: "bulletinarchive", name: "APS Bulletin Archive" },
  { path: "links", name: "Links" },
  { path: "volunteers", name: "Volunteers" },
  { path: "publications", name: "Open Source Publications" },
  { path: "faq", name: "FAQ" },
  { path: "restricted", name: "Restricted" },
];

export const Sidebar = () => {
  return (
    <nav id="sidebar">
      <ul>
        {links.map(({ path, name }) => (
          <li key={path}>
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
