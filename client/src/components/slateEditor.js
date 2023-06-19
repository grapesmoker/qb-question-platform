import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import "./slateEditor.css";
import { SlateToolbar, HoveringToolbar, toggleMark } from "./slateToolbar";
import { Answerline } from "./answerline";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline"
};

const SlateEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const editor = useMemo(() => withInlines(withReact(withHistory(createEditor()))), []);

  return (
    <div className="editor-container">
      <Slate editor={editor} initialValue={initialValue}>
        <SlateToolbar editor={editor} />
        <HoveringToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write a question…"
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
        <Answerline />
      </Slate>
    </div>
  );
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "pronunciation-guide":
      return (
        <span style={style} {...attributes}>
          {children}
          <span className="pronunciation-guide">("{element.pg}")</span>
        </span>
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
        text: "This book describes teenagers who cheat on driver's license tests by cribbing from test answers sewn into clothing that translates as “flower cloth.” Another part of this book describes doctors' elation at publishing a paper about a novel nosocomial infection. This book attributes the sensitivity of CPS social worker Jeanine Hilt to having to deal with fundamentalist parents while being gay. Yer slamming a door is thought to have triggered the title (*) condition of this book, which is treated by the tall doctors Neil and Peggy. This book describes how qaug dab peg is traditionally treated by a txiv neeb, or shaman, and tells of a family who instead took their daughter to a Merced hospital. For 10 points, name this Anne Fadiman book about the failure of American hospitals to treat Lia Lee, an epileptic Hmong child.",
      },
    ],
  },
];

const withInlines = editor => {
  const {
    insertData,
    insertText,
    isInline,
    isElementReadOnly,
    isSelectable,
  } = editor

  editor.isInline = element =>
    ['link', 'button', 'badge'].includes(element.type) || isInline(element)

  editor.isElementReadOnly = element =>
    element.type === 'badge' || isElementReadOnly(element)

  editor.isSelectable = element =>
    element.type !== 'badge' && isSelectable(element)

  editor.insertText = text => {
      insertText(text)
  }

  editor.insertData = data => {
    insertData(data)
  }

  return editor
}


export default SlateEditor;
