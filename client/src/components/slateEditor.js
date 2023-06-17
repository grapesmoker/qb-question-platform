import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Editor } from "slate";
import { withHistory } from "slate-history";
import "./slateEditor.css";
import { SlateToolbar, toggleMark } from "./slateToolbar";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline"
};

const SlateEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className="editor-container">
      <Slate editor={editor} initialValue={initialValue}>
        <SlateToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "This book describes teenagers who cheat on driver's license tests by cribbing from test answers sewn into clothing that translates as “flower cloth.” Another part of this book describes doctors' elation at publishing a paper about a novel nosocomial infection. This book attributes the sensitivity of CPS social worker Jeanine Hilt to having to deal with fundamentalist parents while being gay. Yer (“yehr”) slamming a door is thought to have triggered the title (*) condition of this book, which is treated by the tall doctors Neil and Peggy. This book describes how qaug dab peg (kau da pay) is traditionally treated by a txiv neeb (tsi nehng), or shaman, and tells of a family who instead took their daughter to a Merced hospital. For 10 points, name this Anne Fadiman book about the failure of American hospitals to treat Lia Lee, an epileptic Hmong child.",
      },
    ],
  },
];

export default SlateEditor;
