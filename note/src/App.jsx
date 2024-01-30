import { BrowserRouter as Router, json } from "react-router-dom";
import Rout from "./routes";
import Links from "./Link";
import { Props } from "./contextHooks";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import format from "date-fns/format";
export default function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd HH-mm-ss");
  // Load initial state from local storage or use an empty array if not available
  const [newNotes, setNewNotes] = useState(() => {
    const loadNotes = localStorage.getItem("notes");
    return loadNotes ? JSON.parse(loadNotes) : [];
  });
  function addNotes(e) {
    e.preventDefault();
    const addedNotes = {
      id: uuidv4(),
      title: "Add Title",
      date: formattedDate,
      content: "Add Content..."
    };
    setNewNotes([...newNotes, addedNotes]);
  }

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNewNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    return () => clearInterval(interval);
  }, [newNotes]);

  function deleteNote(e, id) {
    e.preventDefault();
    setNewNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function activeNote(e, id) {
    e.preventDefault();
    console.log("active", id);
    setActiveNoteId(id);
  }

  // function onChangeContent(id, value) {
  //   const newContent = value;
  //   setNewNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === id ? { ...note, note: newContent } : note
  //     )
  //   );
  // }

  return (
    <>
      <div>
        <Props.Provider
          value={{
            addNotes,
            newNotes,
            deleteNote,
            activeNote,
            // onChangeContent,
            setNewNotes,
            setContent,
            setTitle,
            content,
            title
          }}
        >
          <Router>
            <Links />
            <Rout />
          </Router>
        </Props.Provider>
      </div>
    </>
  );
}
