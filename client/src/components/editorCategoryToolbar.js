export default function CategoryToolbar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="editor-category-toolbar">
      <div className="editor-category-toolbar-category">
        <span>Category</span>
        <select className="editor-category-input">
          <optgroup label="Literature">
            <option value="american-literature">American Literature</option>
            <option value="british-literature">British Literature</option>
            <option value="european-literature">American Literature</option>
            <option value="world-literature">World Literature</option>
          </optgroup>
          <optgroup label="History">
            <option value="american-history">American History</option>
            <option value="european-history">European History</option>
            <option value="world-history">World History</option>
            <option value="other-history">Other/Ancient History</option>
          </optgroup>
          <optgroup label="Science">
            <option value="biology">Biology</option>
            <option value="chemistry">Chemistry</option>
            <option value="physics">Physics</option>
            <option value="mathematics">Mathematics</option>
            <option value="computer-science">Computer Science</option>
            <option value="earth-science">Earth Science</option>
            <option value="astronomy">Astronomy</option>
            <option value="engineering">Engineering</option>
          </optgroup>
          <optgroup label="Arts">
            <option value="painting-sculpture">Painting/Sculpture</option>
            <option value="classical-music">Classical Music</option>
            <option value="other-visual">Other Visual Arts</option>
            <option value="other-auditory">Other Auditory Arts</option>
          </optgroup>
          <optgroup label="Beliefs">
            <option value="religion">Religion</option>
            <option value="mythology">Mythology</option>
          </optgroup>
          <optgroup label="Thought">
            <option value="philosophy">Philosophy</option>
            <option value="social-science">Social Science</option>
          </optgroup>
          <optgroup label="Other">
            <option value="geography">Geography</option>
            <option value="current-events">Current Events</option>
            <option value="other-academic">Other Academic</option>
            <option value="pop-culture">Pop Culture</option>
          </optgroup>
        </select>
      </div>
      <div className="editor-category-toolbar-upload">
        <button>Upload question to set</button>
      </div>
    </div>
  );
}
