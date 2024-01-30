import "./textEditor.css";
import { Props } from "./contextHooks";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export default function TextEditor() {
  const { newNotes, setNewNotes, setContent, content, title, setTitle } =
    useContext(Props);
  const location = useLocation();
  const noteID = location.state && location.state.id;

  //find the note
  // const note = newNotes.find((note) => note.id === noteID);

  useEffect(() => {
    // get the note from localStorage
    const getUpdatedNote = localStorage.getItem("notes");

    // Update the state with the notes from localStorage
    if (getUpdatedNote) {
      const parsedNotes = JSON.parse(getUpdatedNote);
      setNewNotes(parsedNotes);
    }
  }, [setNewNotes]);

  useEffect(() => {
    const updatedNote = newNotes.find((note) => note.id === noteID);
    if (updatedNote) {
      setContent(updatedNote.content);
    }
  }, [noteID, newNotes, setContent]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;

    // Update the content in the state
    setContent(newContent);

    // Update the content of the specific note in newNotes
    const updatedNotes = newNotes.map((note) =>
      note.id === noteID ? { ...note, content: newContent } : note
    );

    // Update the state with the modified notes
    setNewNotes(updatedNotes);

    // Update local storage with the modified notes
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  function handleTitleChange(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const updatedNotes = newNotes.map((note) =>
      note.id === noteID ? { ...note, title: newTitle } : note
    );

    setNewNotes(updatedNotes);

    //save the new note Title
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }
  return (
    <>
      <div className="textEditor-header">
        {/* <small className="update-date">01/01/1999</small> */}
        <p className="note-saved">Your Notes will be automatically saved</p>
        <div title="go back">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>

        <input
          type="text"
          placeholder="Title"
          className="title-update"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="text-field"
          placeholder="Note something down"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
    </>
  );
}
