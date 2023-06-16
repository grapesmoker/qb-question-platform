import CharacterCount from '@tiptap/extension-character-count'

export default function MenuBar({ editor, limit }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="editor-toolbar">
      <div className='editor-toolbar-buttons'>
        <button className="editor-toolbar-copy-question">Copy Question</button>
        <button className="editor-toolbar-delete-question">Delete</button>
      </div>
      <div className='editor-toolbar-question-length'>
        <span>"Lines": {Math.ceil(editor.getText().length / 120)}</span>
        <span>Characters: {editor.storage.characterCount.characters()}/{limit}</span>
      </div>
    </div>
  );
}
