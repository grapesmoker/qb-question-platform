import { useSlate, useFocused } from "slate-react";
import { useRef, useEffect } from "react";
import { Transforms, Editor, Range } from "slate";
import { FaBold, FaItalic, FaUnderline, FaNapster } from "react-icons/fa";
import _ from "lodash";

export function SlateToolbar({ value }) {
  const paragraphs = _.filter(value, (node) => node.type === "paragraph");
  const pgs = _.map(
    _.filter(value, (node) => node.type === "pronunciation-guide"),
    (node) => node.children[0].children[0].text.length
  );

  const lengths = _.map(paragraphs, (node) =>
    _.map(node.children, "text").map((text) => text.length)
  )
    .flat()
    .concat(pgs);

  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-buttons">
        <button className="editor-toolbar-copy-question">Copy Question</button>
        <button className="editor-toolbar-delete-question">Delete</button>
      </div>
      <div className="editor-toolbar-question-length">
        {/* <span>Characters: {JSON.stringify(value[0].children[0].text.length)}</span> */}
        <span>
          Characters: {lengths.reduce((partialSum, a) => partialSum + a, 0)}
        </span>
      </div>
    </div>
  );
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();

  switch (icon) {
    case "bold":
      var buttonIcon = <FaBold />;
      break;
    case "italic":
      buttonIcon = <FaItalic />;
      break;
    case "underline":
      buttonIcon = <FaUnderline />;
      break;
    default:
      buttonIcon = <FaNapster />;
  }
  return (
    <button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {buttonIcon}
    </button>
  );
};

const AddPGButton = () => {
  const editor = useSlate();
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        const pg = window.prompt("Enter the pronunciation guide:");
        if (!pg) return;
        insertLink(editor, pg);
      }}
    >
      PG
    </button>
  );
};

const insertLink = (editor, pg) => {
  if (editor.selection) {
    wrapLink(editor, pg);
  }
};

const wrapLink = (editor, pg) => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "pronunciation-guide",
    pg,
    children: isCollapsed ? [{ text: selection }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const HoveringToolbar = () => {
  const ref = useRef();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.scrollY - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.scrollX - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <div>
      <div
        ref={ref}
        className="bubble-menu"
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
      >
        <MarkButton format="bold" icon="bold" />
        <MarkButton format="italic" icon="italic" />
        <MarkButton format="underline" icon="underline" />
        <AddPGButton />
      </div>
    </div>
  );
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
