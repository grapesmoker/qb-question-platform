export function Answerline() {
  return (
    <span className="main-answer">
      ANSWER:{" "}
      <u>
        <em>
          The<strong> Spirit Catches You And You Fall Down</strong>
        </em>
      </u>
    </span>
  );
}

const MainAnswer = ({ children }) => {
  <span className="main-answer">ANSWER: {children}</span>;
};
