import React from "react";
import { useDroppable } from "@dnd-kit/core";
import styles from "./dnd.module.css";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <td
      className={styles.questionSlot}
      ref={setNodeRef}
      style={style}
      id={props.id}
    >
      <div className={styles.questionDiv}>{props.children}</div>
    </td>
  );
}
