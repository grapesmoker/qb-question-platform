import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, useSlateStatic } from "slate-react";
import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import "./slateEditor.css";
import { HoveringToolbar, toggleMark } from "./slateToolbar";
import { Leaf, Element, withInlines } from "./slateUtils";
import { FaPlus, FaTimes } from "react-icons/fa";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
};

export const MainAnswer = ({ attributes }) => {
  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <>
      <a
        className="answerline-guidelines"
        href="http://minkowski.space/quizbowl/manuals/style/answerlines.html"
      >
        Answerline guidelines
      </a>
      <div
        {...attributes}
        className="answerline-instruction"
        contentEditable={false}
      >
        <span>ANSWER: </span>
        <RichTextEditor className="main-answer" />
        <InsertAnswerlineInstructionButton />
      </div>
    </>
  );
};

export const AnswerlineInstruction = ({ attributes }) => {
  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <>
      <div
        {...attributes}
        className="answerline-instruction"
        contentEditable={false}
      >
        <span>ANSWER: </span>
        <RichTextEditor className="answerline-instruction-editor" />
        <RemoveAnswerlineInstructionButton />
      </div>
    </>
  );
};

const RichTextEditor = ({ init }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const editor = useMemo(
    () => withInlines(withReact(withHistory(createEditor()))),
    []
  );

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <HoveringToolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
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
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

const insertAnswerlineInstruction = (editor) => {
  const text = { text: "" };
  const voidNode = {
    type: "answerline-instruction",
    position: editor.children[1].length,
    children: [text],
  };
  Transforms.insertNodes(editor, voidNode, {
    at: [1, 1],
  });
};

const InsertAnswerlineInstructionButton = () => {
  const editor = useSlateStatic();
  return (
    <button
      className="answerline-button"
      onClick={(event) => {
        event.preventDefault();
        insertAnswerlineInstruction(editor);
      }}
    >
      <FaPlus />
    </button>
  );
};

const RemoveAnswerlineInstructionButton = () => {
  const editor = useSlateStatic();
  return (
    <button
      className="answerline-button"
      onClick={(event) => {
        event.preventDefault();
        Transforms.removeNodes(editor, { at: [1, 1] });
      }}
    >
      <FaTimes />
    </button>
  );
};
