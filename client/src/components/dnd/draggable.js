import React from "react";
import { useDraggable } from "@dnd-kit/core";
import classnames from "classnames";

import styles from "./dnd.module.css";
import tables from "../tables.module.css";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: { title: props.children },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className={classnames(styles.questionTab, tables[props.status])}
      ref={setNodeRef}
      style={style}
      role="button"
      {...listeners}
      {...attributes}
    >
      {props.answer} <br />
      <div className={tables.questionStatusRow}>
        <button className={tables.questionStatus}>
          {props.status}
        </button>
        <span>
          {props.author ? `<${props.author}>` : ""}
          {props.editor ? ` |${props.editor}|` : ""}
        </span>
      </div>
    </div>
  );
}
