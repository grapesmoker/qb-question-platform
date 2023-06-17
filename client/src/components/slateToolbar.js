import { useSlate } from "slate-react";
import { Editor } from "slate";
import { FaBold, FaItalic, FaUnderline, FaNapster } from "react-icons/fa";

export function SlateToolbar() {
  return (
    <div className="editor-toolbar-buttons">
      <MarkButton format="bold" icon="bold" />
      <MarkButton format="italic" icon="italic" />
      <MarkButton format="underline" icon="underline" />
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
