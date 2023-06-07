import { APS_FACEBOOK_LINK } from "../utilities/constants";
export const Home = () => {
  return (
    <main>
      <section>
        <p>
          The Alberta Palaeontological Society (APS) is a non-profit
          organization founded in 1986 to:
        </p>
        <ul>
          <li>
            Promote the science of palaeontology through study and education.{" "}
          </li>
          <li>
            Make contributions to the science by:
            <ul>
              <li>Discovery</li> <li>Responsible collection</li>
              <li>Curation and display</li>
              <li>Education of the general public</li>
              <li>
                Preservation of palaeontological material for study and future
                generations
              </li>
            </ul>
          </li>
          <li>
            To work with the professional and academic communities to aid in the
            preservation and understanding of Alberta’s heritage.
          </li>
        </ul>
      </section>

      <section>
        <p>
          <a href={APS_FACEBOOK_LINK}>
            <img
              src="/logos/f_logo_RGB-Blue_58.png"
              style={{ height: "1em", verticalAlign: "middle" }}
            ></img>
          </a>
          Visit us on facebook!{" "}
        </p>
      </section>

      <section>
        <h3>The APS has a new book for sale!</h3>{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4 style={{ textAlign: "center" }}>APS Books for Sale</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <a href="APSBooks#commonvertebratefossils">
              <img
                alt="Guide to Common Vertebrate Fossils from the Cretaceous of Albera"
                src="/guidetofossilssmall.jpg"
                style={{ marginRight: "8px" }}
              />
            </a>
            <a href="APSBooks#hopejohnson">
              <img alt="Now There Was a Lady!" src="/ladycoversmall.jpg" />
            </a>
          </div>

          <p>
            Refer to the <a href="APSBooks">APS Books for Sale</a> link on this
            website for cost, how to purchase a copy and other details. These
            books will also be available for purchase at our monthly meetings.
          </p>
        </div>{" "}
      </section>
      <section>
        <h2>Alberta Palaeontological Society Privacy Policy and Disclaimers</h2>{" "}
        <p>
          The following statements and disclaimers apply to the website of the
          Alberta Palaeontological Society (APS) unless otherwise noted.
        </p>{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[
            { text: "Privacy", id: "privacy" },
            { text: "Website Content and Links", id: "external" },
            { text: "Copyright", id: "copyright" },
            { text: "Liability", id: "liability" },
            { text: "Contact Us", id: "contact" },
          ].reduce(
            (
              acc: Array<React.ReactNode>,
              { text, id },
              index,
              allDisclaimers
            ) => {
              acc.push(
                <a key={id} href={`disclaimers#${id}`}>
                  {text}
                </a>
              );
              if (index !== allDisclaimers.length - 1) {
                acc.push(
                  <p key={`p-${id}`} style={{ margin: "0 8px" }}>
                    ||
                  </p>
                );
              }
              return acc;
            },
            []
          )}
        </div>
      </section>
    </main>
  );
};
