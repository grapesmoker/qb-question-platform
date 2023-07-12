import styles from "./login.module.css";
import questionCommenting from "../../image1.png";
import allQuestions from "../../image2.png";
import questionWriting from "../../image3.png";

function Card({ children }) {
  return <div className={styles.imageBackground}>{children}</div>;
}

export default function Showoff() {
  return (
    <div className={styles.showoffDiv}>
      <div className={styles.flex}>
        <Card>
          <img
            className={styles.image}
            width="280px"
            alt="Quote's question-editing interface."
            src={questionCommenting}
          />
        </Card>
        <div>
          <span className={styles.quoteQuote}>“</span>
          <div className={styles.quoteFlex}>
            <span className={styles.quoteName}>QUOTE</span>
            <span className={styles.quoteDescription}>
              An all-in-one quizbowl tournament production software for writing,
              editing, and packetization
            </span>
          </div>
        </div>
      </div>
      <div className={`${styles.flex} ${styles.reverseRow}`}>
        <Card>
          <img
            className={styles.image}
            width="470px"
            alt="Quote's question-writing interface."
            src={allQuestions}
          />
        </Card>
      </div>
      <div className={styles.flex}>
        <Card>
          <img
            className={styles.image}
            width="360px"
            alt="Quote's question-writing interface."
            src={questionWriting}
          />
        </Card>
      </div>
    </div>
  );
}
