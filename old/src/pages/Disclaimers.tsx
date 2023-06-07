import { LinkToTop } from "../components";

const disclaimers: Array<{
  title: string;
  contents: React.ReactNode;
  id?: string;
}> = [
  {
    title: "Links to other websites",
    contents: (
      <>
        <p>
          Links and pointers to other websites are provided for information only
          and do not constitute endorsement, express or implied, of the
          referenced organization as to content, products, or services, whether
          they are governmental, educational, or commercial.
        </p>
      </>
    ),
    id: "external",
  },
  {
    title:
      "Non-Endorsement of Commercial Products of Other Websites and Services",
    contents: (
      <>
        <p>
          Hypertext links and other references to other websites and services
          are provided for information only and do not constitute endorsement or
          warranty, express or implied as to content, usefulness, functioning,
          completeness, or accuracy.
        </p>
      </>
    ),
  },
  {
    title: "Public-Domain Software",
    contents: (
      <>
        <p>
          Links are provided to public-domain software (Adobe Acrobat). Although
          these programs have been used by APS, no warranty, expressed or
          implied, is made by as to the accuracy and functioning of the programs
          and related program material, nor shall the fact of distribution
          constitute any such warranty, and no responsibility is assumed by the
          APS in connection therewith.
        </p>
      </>
    ),
  },
  {
    title: "Content Accuracy, Completeness, and Usability of APS Information",
    contents: (
      <>
        <p>
          We make every effort to provide and maintain accurate, complete,
          usable, and timely information on our web site. This information is
          provided with the understanding that it is not guaranteed to be
          correct or complete. Users are cautioned to consider carefully the
          provisional nature of the information before using it for decisions.
          Conclusions drawn from, or actions undertaken on the basis of, such
          information are the sole responsibility of the user.
        </p>
      </>
    ),
  },
  {
    title: "Copyright",
    contents: (
      <>
        <p>
          APS authored or produced data, information and images/graphics on the
          APS website are copyright by APS. Information on this website has been
          posted with the intent that it be readily available for personal and
          public non - commercial (educational) use. Reproduction of
          information, in part or in whole by any means, is permitted ONLY with
          permission from APS.
        </p>

        <p>
          The material on this site is covered by the provisions of the{" "}
          <a href="https://www.ic.gc.ca/eic/site/cipointernet-internetopic.nsf/eng/h_wr02281.html">
            <em>Canadian Copyright Act</em>
          </a>
          , by Canadian laws, policies, regulations and international
          agreements. Such provisions serve to identify the information source
          and, in specific instances, to prohibit reproduction of materials
          without written permission.
        </p>

        <p>
          You are welcome to make a link to the APS website. There is no need to
          request permission.
        </p>

        <p>
          Use of the APS visual identifier (logo) is not permitted without
          permission.
        </p>

        <p>
          We will identify material we use on the APS website, and request
          others do the same when using information published by APS. Credit can
          be provided by including on the page (or via a link to a credits page)
          a citation such as:
        </p>
        <p>
          {" "}
          Credit : Alberta Palaeontological Society <br />
          APS/photo by John Doe (if the photographer is known)
        </p>
      </>
    ),
    id: "copyright",
  },
  {
    title: "Liability",
    contents: (
      <p>
        Neither the APS Officers nor Directors nor any Committee thereof make
        any warranty, express or implied, nor assume any legal liability or
        responsibility for the accuracy, completeness, or usefulness of any
        information, data, product, or process disclosed, nor represent that its
        use would not infringe on privately owned rights. APS does not assume
        any liability deemed to have been caused directly or indirectly by any
        content on its web site.
      </p>
    ),
    id: "liability",
  },
  {
    title: "To Contact Us",
    contents: (
      <>
        <p>If you have any questions about APS, please contact us:</p>

        <address>
          <p>
            E - Mail to{" "}
            <a href="mailto:info@albertapaleo.org">info@albertapaleo.org</a>:
          </p>
        </address>
        <p>Mailing address:</p>
        <address>
          <p>Alberta Palaeontological Society</p>
          <p>P.O. Box 68024, Crowfoot Postal Outlet</p>
          <p>Calgary, Alberta, Canada, T3G 3N8</p>
        </address>
      </>
    ),
    id: "contact",
  },
];

export const Disclaimers = () => {
  return (
    <main>
      <h2 id="privacy">
        Alberta Paleontological Society Privacy Policy and Disclaimers
      </h2>
      <h3>
        The following statements and disclaimers apply to the website of the
        Alberta Palaeontological Society (APS).
      </h3>

      <h3>
        How we handle the information we gather when you visit our website
      </h3>

      <h2>Alberta Palaeontological Society Privacy Statement</h2>
      <p>
        The APS is committed to respecting the personal privacy of individuals
        who visit our web site. This page summarizes the privacy policy and
        practices of the APS web site.
      </p>
      <ul>
        <li>
          APS does not automatically gather any personal information from you,
          such as your name, phone number, e-mail or street address during your
          visit to its web sites. This information is obtained only if you
          supply it voluntarily, usually through contacting us via e-mail or
          registering in a secure portion of the site.
        </li>
        <li>
          Any personal information that you do provide is protected under the
          federal&nbsp;
          <a href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-privacy-act/">
            <em>Privacy Act</em>
          </a>
          .
        </li>
      </ul>

      <h4>Web server activity logs</h4>

      <p>
        Like most web servers on the Internet, our servers collect and store all
        of the information that your web browser sends when it requests a web
        page.
      </p>

      <p>
        It is impossible to determine the actual identity of an individual user
        from this information.
      </p>

      <p>
        The logs are periodically summarized and analyzed in order to study site
        usage over time and to perform other studies to help us improve the
        site's organization, performance, and usefulness.
      </p>

      <h4>Electronic mail</h4>
      <p>
        When you send us personal identifying information via e-mail (that is,
        in a message containing a question or comment, or by filling out a form
        that e-mails us this information), we use it to respond to your
        requests. We do not retain or distribute lists of e-mail addresses to
        any parties outside of APS.
      </p>

      <h4>File transfer protocol (FTP)</h4>
      <p>
        Our site using the file transfer protocol may also store your e-mail
        address if your web browser is configured to provide it. By default most
        web browser software does not send your e-mail address; this option is
        configured through your browser preferences. In Netscape Navigator, for
        example, this option must be set by you through the Advanced preferences
        category by the item labeled, "Send email address as anonymous FTP
        password."
      </p>

      <h4>Collection and release of gathered information </h4>
      <p>
        We want to make it clear that we will not obtain personal identifying
        information about you when you visit our web site. Except in the course
        of officially authorized law enforcement investigations, or in the event
        of a suspected attempt to deliberately circumvent our system's security
        with the intent to gain unauthorized access or to do physical damage
        (for example, an attack by hackers), we do not attempt to identify
        individual users or share any information we receive with any parties
        outside of the APS. In the latter case, collected information associated
        with a suspected intruder might be shared with law enforcement.
      </p>

      <h4>Retention of collected information </h4>
      <p>
        <b>Cookies</b> - Some applications may save a "cookie" on your
        computer's hard disk to provide a temporary history of actions taken. A
        common example is the tracking of items placed in an online "shopping
        basket." We do not retain any record of "cookies" beyond what is
        necessary for running the application.
      </p>
      <p>
        <b>Web server activity logs</b> - Monthly extracts of the log files are
        archived and stored off-line at our discretion for an indefinite period
        of time. Some statistical summaries derived from these data may be
        retained online or off-line at our discretion for an indefinite period
        of time.
      </p>

      <p>
        <b>E-mail</b> - Information collected via e-mail will be retained at our
        discretion in a directly readable form for as long as necessary to
        complete our response. The e-mail itself may be retained in an archival
        form.
      </p>

      {disclaimers.map(({ title, contents, id }, index, allDisclaimers) => {
        return (
          <section id={id}>
            <h3>{title}</h3>
            {contents}
            <LinkToTop />
            {index !== allDisclaimers.length - 1 ? <hr /> : null}
          </section>
        );
      })}
    </main>
  );
};
