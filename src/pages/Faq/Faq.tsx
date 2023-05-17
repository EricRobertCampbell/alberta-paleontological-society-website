import { slugify } from "../../utilities";

interface QuestionAnswerPair {
  question: string;
  answer: React.ReactNode;
}

const questionAnswerPairs: Array<QuestionAnswerPair> = [
  {
    question: "How does a person become a palaeontologist?",
    answer: (
      <>
        <p>
          Not many universities offer 4-year undergraduate degrees in
          palaeontology. The ones that do are mostly in the USA, such as UC
          Berkeley (California). The usual route to becoming a palaeontologist
          is to begin with getting a Bachelor's degree in one of two fields of
          science: geology or biology. Which one you choose will very much
          depend on your interests. Even after choosing say the geology path, it
          is still a good idea to also take courses in the biology field,
          especially zoology and anatomy.
        </p>
        <p>
          Each school has different course requirements for a degree program.
          You will likely have to take courses in math, physics, chemistry as
          well as options from other faculties (English, foreign languages,
          social sciences, history, arts, etc.) as a requirement for completing
          your degree. These latter courses may seem like a waste of time, but
          they are requirements for getting a degree, and you will have to take
          them. A course in English and creative writing is important too
          because to be a good palaeontologist, you will have to be able to
          write papers and you MUST be able to communicate properly. Mathematics
          is important because study of fossils often includes statistical
          analysis.
        </p>
        <p>
          If you're still in high school, make sure you take biology, physics,
          chemistry and math before you graduate from grade 12. If you're
          missing any of these you will run into roadblocks in university. Once
          you have your 4-year degree in geology or biology, then you will be
          able to specialize in palaeontology in a Master's program (usually
          another 2 years), and continue with a PhD program (another 2 to 5
          years--some very bright people skip the Master's degree and go
          straight to the PhD). You will find that you need a PhD in order to
          teach or do research in palaeontology. The best way to find out which
          specific courses you need is to talk to the people in the departments
          you are interested in. If you want to go to U of A, go to the
          department of Earth and Atmospheric Sciences (geology), or Biological
          Sciences, and ask to talk to someone (a counsellor or one of the
          professors) about course requirements for a career in palaeontology.
          They will ask you the right questions and give you the best
          information. Same for any other university (such as U of Calgary) you
          might be interested in attending. (Yes, you can get a palaeontology
          degree at U of C &mdash; there are several graduate students studying
          dinosaurs there right now.)
        </p>
      </>
    ),
  },
  {
    question: "I'm not a member, can I attend a field trip?",
    answer: (
      <p>
        {" "}
        You have to be a member to attend field trips. By joining the society
        you will be entitled to enjoy all the other benefits of membership too.
        To join the society visit the MEMBERSHIP tab on this website. If you
        plan to join the society, join several weeks before the field trip
        rather then on the day of the field trip. The field trip coordinator is
        busy organizing the trip and does not handle memberships at the site.
      </p>
    ),
  },
  {
    question: "Where can I park to attend one of your meetings?",
    answer: (
      <>
        <p>
          Visit the <a href="meetings">MEETINGS/EVENTS</a> tab on this website.
          Once in that section of the website, scroll to the bottom where you
          will find a map of Mount Royal University in Calgary including the
          parking areas. The University does charge a small fee for parking.
        </p>
        <p>
          A map of the parking areas can also be found on the last page of the
          {" "}<a href="guide3web">MEMBERS' GUIDE</a>.
        </p>
      </>
    ),
  },
  {question: "Can I sign books out of the APS library?",
    answer: <p>
       Yes, any member may sign out a book from the APS library. Speak with the APS librarian at the monthly meeting.
    </p>},{ question: "I've found a fossil I'd like to have identified. Who should I contact?",
       answer: <p>
          Refer to the <a href="guide3web">MEMBERS' GUIDE</a> tab on this website. The <a href="guide3web">MEMBERS' GUIDE</a> includes a section on this topic and provides recommendations.
       </p>
       },
       {question: "I'm planning to visit Alberta next summer; what are the regulations about fossil collecting?", answer: <>
         <p>
            Refer to the <a href="guide3web">MEMBERS' GUIDE</a> tab on this website. The <a href="guide3web">MEMBERS' GUIDE</a> includes a section on the regulations about fossil collecting.
         </p>
       </>}
];

export const Faq = () => {
  return (
    <>
      <h2>Frequently Asked Questions</h2>
      <ul>
        {questionAnswerPairs.map(({ question }) => (
          <li key={slugify( question )}>
            <a href={`#${slugify(question)}`}>
              {question}
            </a>
          </li>
        ))}
      </ul>
      <main>
      {questionAnswerPairs.map(({ question, answer }) => {
        return (
        <section id={slugify(question)}>
        <h3 >{question}</h3>
        {answer}
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          }}
        >
          <a href="#top">Back to Top</a>
        </div>
        <hr />
        </section>
        );
      })}
        </main>
      <footer style={{marginBottom: "24px"}}>
        To find out more please contact the webmaster, Vaclav Marsovsky at <a href="tel:(403) 547-0182">(403) 547-0182</a> 
      </footer>
    </>
  );
};
