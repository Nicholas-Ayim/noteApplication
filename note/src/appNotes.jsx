import { useContext } from "react";
import "./appNote.css";
import { Props } from "./contextHooks";

export default function AppNotes() {
  const { addNotes, newNotes } = useContext(Props);

  return (
    <>
      <div className="notes-container">
        <div className="add-notes">
          <small>NAYY Notes</small>
          <button className="add-notes" onClick={addNotes}>
            add Notes
          </button>
        </div>

        {/* Display added notes */}
        {newNotes.map((note, index) => (
          <div className="notes" key={index}>
            <div className="title-container">
              <small className="title">{note.title}</small>
              <small className="preview-content">{note.content}</small>
              <small>Date: {note.date}</small>
            </div>
            <div className="delete-notes">
              <button className="delete">delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
