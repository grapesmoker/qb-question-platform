import _ from "lodash";
import tables from "./tables.module.css";
import classnames from "classnames";

import { FaChevronDown } from "react-icons/fa";

export default function AllQuestions() {
  const questionData = require("./sample-all-questions.json");
  const numPackets = [1, 2, 3, 4, 5];

  var cats = _.groupBy(_.filter(
    questionData.questions,
    (question) => question.type !== "bonus"
  ), "category");
  var bcats = _.groupBy(
    _.filter(
      questionData.questions,
      (question) => question.type === "bonus"
    ),
    "category"
  );
  const all_subcats = {
    Literature: [
      "American Literature",
      "British Literature",
      "European Literature",
      "World Literature",
    ],
    History: [
      "American History",
      "European History",
      "World History",
      "Other History",
    ],
  };

  console.log(cats);

  return (
    <div>
      <h2>All Questions</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          {/* <thead>
            <tr>
              <th className={tables.headerColumn}>Subcategory</th>
              {numPackets.map((packet) => {
                return <th className={tables.column}>{packet}</th>;
              })}
            </tr>
          </thead> */}
          <tbody>
            {Object.keys(cats).map((cat) => {
              // console.log(all_subcats[cat]);
              return (
                <>
                  <tr>
                    <td
                      className={tables.catColumn}
                      colSpan={numPackets.length + 1}
                    >
                      {cat}
                    </td>
                  </tr>
                  {all_subcats[cat].map(function (subcat_name) {
                    console.log(_.groupBy(cats[cat], "subcategory"));
                    return (
                      <>
                        <tr className={tables.subcatRow}>
                          <td className={tables.headerColumn}>
                            {subcat_name + " Tossups"}
                          </td>
                          {subcat_name in _.groupBy(cats[cat], "subcategory")
                            ? numPackets
                                .map((x) => x - 1)
                                .map((q_num) => {
                                  let q = _.groupBy(cats[cat], "subcategory")[
                                    subcat_name
                                  ][q_num];
                                  if (
                                    q_num + 1 >
                                    _.groupBy(cats[cat], "subcategory")[
                                      subcat_name
                                    ].length
                                  ) {
                                    return (
                                      <td
                                        className={classnames(
                                          tables.questionCell,
                                          tables.unclaimed
                                        )}
                                      >
                                        {""}
                                        <br />
                                        <button
                                          className={tables.questionStatus}
                                        >
                                          unclaimed
                                          <FaChevronDown
                                            className={tables.arrowIcon}
                                          />
                                        </button>
                                      </td>
                                    );
                                  } else {
                                    return (
                                      <td
                                        className={classnames(
                                          tables.questionCell,
                                          tables[q.status]
                                        )}
                                      >
                                        {q.answer ? q.answer : q.slot}
                                        <br />
                                        <div
                                          className={tables.questionStatusRow}
                                        >
                                          <button
                                            className={tables.questionStatus}
                                          >
                                            {q.status}
                                            <FaChevronDown
                                              className={tables.arrowIcon}
                                            />
                                          </button>
                                          <span>
                                            {q.author ? `<${q.author}>` : ""}
                                            {q.editor ? ` |${q.editor}|` : ""}
                                          </span>
                                        </div>
                                      </td>
                                    );
                                  }
                                })
                            : numPackets
                                .map((x) => x - 1)
                                .map((q_num) => (
                                  <td
                                    className={classnames(
                                      tables.questionCell,
                                      tables.unclaimed
                                    )}
                                  >
                                    {""}
                                    <br />
                                    <button className={tables.questionStatus}>
                                      unclaimed
                                      <FaChevronDown
                                        className={tables.arrowIcon}
                                      />
                                    </button>
                                  </td>
                                ))}
                        </tr>
                        <tr className={tables.subcatRow}>
                          <td className={tables.headerColumn}>
                            {subcat_name + " Bonuses"}
                          </td>
                          {subcat_name in _.groupBy(bcats[cat], "subcategory")
                            ? numPackets
                                .map((x) => x - 1)
                                .map((q_num) => {
                                  let q = _.groupBy(bcats[cat], "subcategory")[
                                    subcat_name
                                  ][q_num];
                                  if (
                                    q_num + 1 >
                                    _.groupBy(bcats[cat], "subcategory")[
                                      subcat_name
                                    ].length
                                  ) {
                                    return (
                                      <td
                                        className={classnames(
                                          tables.questionCell,
                                          tables.unclaimed
                                        )}
                                      >
                                        {""}
                                        <br />
                                        <button
                                          className={tables.questionStatus}
                                        >
                                          unclaimed
                                          <FaChevronDown
                                            className={tables.arrowIcon}
                                          />
                                        </button>
                                      </td>
                                    );
                                  } else {
                                    return (
                                      <td
                                        className={classnames(
                                          tables.questionCell,
                                          tables[q.status]
                                        )}
                                      >
                                        {q.answer ? q.answer : q.slot}
                                        <br />
                                        <div
                                          className={tables.questionStatusRow}
                                        >
                                          <button
                                            className={tables.questionStatus}
                                          >
                                            {q.status}
                                            <FaChevronDown
                                              className={tables.arrowIcon}
                                            />
                                          </button>
                                          <span>
                                            {q.author ? `<${q.author}>` : ""}
                                            {q.editor ? ` |${q.editor}|` : ""}
                                          </span>
                                        </div>
                                      </td>
                                    );
                                  }
                                })
                            : numPackets
                                .map((x) => x - 1)
                                .map((q_num) => (
                                  <td
                                    className={classnames(
                                      tables.questionCell,
                                      tables.unclaimed
                                    )}
                                  >
                                    {""}
                                    <br />
                                    <button className={tables.questionStatus}>
                                      unclaimed
                                      <FaChevronDown
                                        className={tables.arrowIcon}
                                      />
                                    </button>
                                  </td>
                                ))}
                        </tr>
                      </>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
