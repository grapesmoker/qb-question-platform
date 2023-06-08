export default function CategoryToolbar({ editor }) {
    if (!editor) {
      return null;
    }
  
    return (
      <div className="editor-category-toolbar">
        <div className='editor-category-toolbar-category'>
          <span>Category</span>
          <input className="editor-category-input"></input>
        </div>
        <div className='editor-category-toolbar-upload'>
          <button>Upload question to set</button>
        </div>
      </div>
    );
  }
  