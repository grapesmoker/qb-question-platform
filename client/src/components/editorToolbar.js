export default function MenuBar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="editor-toolbar">
      {/* <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          redo
        </button> */}
      <div className='editor-toolbar-buttons'>
        <button className="editor-toolbar-copy-question">Copy Question</button>
        <button className="editor-toolbar-delete-question">Delete</button>
      </div>
      <div className='editor-toolbar-question-length'>
        <span>Lines: {Math.ceil(editor.getText().length / 120)}</span>
        <span>Characters: {editor.getText().length}</span>
      </div>
    </div>
  );
}
