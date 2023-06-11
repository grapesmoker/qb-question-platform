import _ from "lodash";
import tables from "./tables.module.css";

export default function AllQuestions() {
  const questionData = require("./sample-all-questions.json");
  const numPackets = [1, 2, 3, 4, 5];
  var subcats = _.groupBy(questionData.questions, "subcategory");
  console.log(subcats);
  //   subcats = ["American Literature", "British Literature"];

  return (
    <div>
      <h2>All Questions</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th className={tables.headerColumn}>Subcategory</th>
              {numPackets.map((packet) => {
                return <th className={tables.column}>{packet}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {Object.keys(subcats).map((subcat) => {
              return (
                <tr>
                  <td className={tables.headerColumn}>{subcat}</td>
                  {subcats[subcat].map((answer) => (
                    <td className={tables.column}>{answer.answer}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
