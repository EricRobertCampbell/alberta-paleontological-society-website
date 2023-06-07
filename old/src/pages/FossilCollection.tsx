import { EmailLink, TelephoneLink } from "../components";
export const FossilCollection = () => {
  return (
    <>
      {" "}
      <h2>APS Fossil Collection</h2>
      <p>
        The APS fossil collection includes vertebrates, invertebrates, plants,
        and ichnofossils (tracks), primarily from Alberta, but also from other
        areas of North America. The collection has been in existence since the
        late 1980s.
      </p>
      <p>
        The APS Fossil Collection is available to members for viewing, for
        comparative study in identification of your own fossils or for use in
        educational undertakings. From time to time it is also used for displays
        at the annual APS Symposium and at the Calgary Rock and Lapidary Club
        show.
      </p>
      <p>
        The collection is properly indexed in a database managed by the APS
        Curator.
      </p>
      <p>
        For inquiries about the collection, about the listing of the fossils, or
        access to the collection, please contact the Curator, Howard Allen as
        follows:
      </p>
      <address>
        <p>
          Howard Allen,
          <br />
          c/o Alberta Palaeontological Society
          <br />
          P.O. Box 68024, Crowfoot Postal Outlet
          <br />
          Calgary, Alberta &nbsp;T3G 3N8
          <br />
          Canada
        </p>
      </address>
      <p>or</p>
      <address>
        <p>
          Howard Allen <br />
          7828 Hunterslea Cr., N.W. <br />
          Calgary, Alberta &nbsp;T2K 4M2 <br />
          Canada <br />
          Ph. 403-274-1858
        </p>
      </address>
      <p>Viewing must be arranged ahead of time!</p>
      <p>
        You may also E-mail the editor at{" "}
        <EmailLink email="editor2@albertapaleo.org" />.
      </p>
      <p>
        Donations are welcome providing complete field information and locality
        data comes with the fossil. Contact the Curator.
      </p>
    </>
  );
};
