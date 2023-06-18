import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, useSlate, useSlateStatic } from "slate-react";
import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import "./slateEditor.css";
import { HoveringToolbar, toggleMark } from "./slateToolbar";
import { Leaf, Element, withInlines } from "./slateUtils";
import { FaPlus } from "react-icons/fa";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
};

export const MainAnswer = ({ attributes }) => {
  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <>
      <div {...attributes} className="answerline" contentEditable={false}>
        <span>ANSWER:</span>
        <RichTextEditor className = 'main-answer'/>
        <InsertAnswerlineInstructionButton />
      </div>
    </>
  );
};

const RichTextEditor = () => {
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
        text: "The Spirit Catches You And You Fall Down",
      },
    ],
  },
];

const insertAnswerlineInstruction = editor => {
  const text = { text: '' }
  const voidNode = {
    type: 'main-answer',
    children: [text],
  }
  Transforms.insertNodes(editor, voidNode)
}

const InsertAnswerlineInstructionButton = () => {
  const editor = useSlateStatic()
  return (
    <button
      onMouseDown={event => {
        event.preventDefault()
        insertAnswerlineInstruction(editor)
      }}
    >
      <FaPlus />
    </button>
  )
}
