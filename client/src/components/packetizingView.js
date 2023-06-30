import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import _ from "lodash";

import { Draggable } from "./dnd/draggable";
import { Droppable } from "./dnd/droppable";

import styles from "./dnd/dnd.module.css";

export default function Packetizing() {
  const questionData = require("./sample-set-questions.json");
  const questions = [...Array(20).keys()].map(x => x + 1);
  const packets = [...Array(5).keys()].map(x => x + 1);
  const [packetAssignments, setPacketAssignments] = useState(questionData);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <table className={styles.packetTable}>
        <thead>
          <tr>
            {packets.map((num) => (
              <th key={"packet" + num}>Packet {num}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <tr key={"row" + id}>
              {packets.map((num) => (
                <Droppable key={`${num}-${id}`} id={`${num}-${id}`}>
                  {id}
                  {_.filter(
                    packetAssignments,
                    (question) =>
                      (question.packet === num) & (question.question === id)
                  ).map((question) => (
                    <Draggable
                      id={question.answer}
                      answer={question.answer}
                      category={question.category}
                      subcategory={question.subcategory}
                      status={question.status}
                      author={question.author}
                      editor={question.editor}
                    ></Draggable>
                  ))}
                </Droppable>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DndContext>
  );

  function handleDragEnd(event) {
    let newAssignments = packetAssignments;

    const previous_loc = _.filter(
      packetAssignments,
      (question) => question.answer === event.active.id
    );

    newAssignments = _.map(newAssignments, (question) => {
      if (
        (question.packet === Number(event.over.id.substring(0, 1))) &
        (question.question === Number(event.over.id.substring(2)))
      ) {
        question.packet = previous_loc[0].packet;
        question.question = previous_loc[0].question;
        return question;
      } else {
        return question;
      }
    });

    newAssignments = _.map(newAssignments, (question) => {
      if (question.answer === event.active.id) {
        question.packet = Number(event.over.id.substring(0, 1));
        question.question = Number(event.over.id.substring(2));
        return question;
      } else {
        return question;
      }
    });
    setPacketAssignments(newAssignments);
    // console.log(event);
    // setPacketAssignments({
    //     "2-1": <Draggable id="draggable">Drag me</Draggable>,
    //   });
  }
}
