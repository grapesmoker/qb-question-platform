import React, { useState, useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import {
  Editable,
  withReact,
  Slate,
  useSlate,
  useSlateStatic,
} from "slate-react";
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
      <div className="answerline-guidelines">
        <a href="http://minkowski.space/quizbowl/manuals/style/answerlines.html">
          Answerline guidelines
        </a>
      </div>
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
  const [value, setValue] = useState(initialValue);

  const editor = useMemo(
    () => withInlines(withReact(withHistory(createEditor()))),
    []
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
      initialValue={initialValue}
    >
      <HoveringToolbar />
      <AnswerlineLinterButton />
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
        text: "John I [or John II, prompt on John]",
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

const AnswerlineLinterButton = () => {
  const editor = useSlate();
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        LintAnswerline(editor);
      }}
    >
      Answerline linter
    </button>
  );
};

const LintAnswerline = (editor) => {
  let answerline = editor.children[0].children[0].text;
  let error_causer = "John";
  let matches = [...answerline.matchAll(new RegExp(error_causer, "gi"))].map(
    (a) => a.index
  );

  console.log(editor.children[0]);
  for (const match of matches) {
    Transforms.insertText(
      editor,
      "Joao",
      {
        at: {
          anchor: { path: [0, 0], offset: match },
          focus: { path: [0, 0], offset: match + error_causer.length },
        },
      }
    );
  }
};
