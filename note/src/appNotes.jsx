import { useContext, useState } from "react";
import "./appNote.css";
import { Props } from "./contextHooks";
import { useNavigate } from "react-router-dom";

export default function AppNotes() {
  const { addNotes, newNotes, deleteNote } = useContext(Props);
  const navigate = useNavigate();
  function activeNote(e, id) {
    e.preventDefault();
    navigate("/editor", { state: { id: id } });
    console.log("navigate", id);
    // setActiveId(id);
  }

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
          <div
            className={`"notes, ${index % 2 == 0 ? "grey-bg" : "eee-bg"} "`}
            key={index}
          >
            <div
              className="title-container"
              onClick={(e) => activeNote(e, note.id)}
            >
              <small className="title">TITLE: {note.title}</small>
              <small className="preview-content">
                BODY: {note.content ? note.content.substr(0, 20) : ""}
              </small>
              <small className="date-now">DATE: {note.date}</small>
            </div>
            <div className="delete-notes">
              <button
                className="delete"
                onClick={(e) => deleteNote(e, note.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
