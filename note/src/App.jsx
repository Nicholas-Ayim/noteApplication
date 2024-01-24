import { BrowserRouter as Router } from "react-router-dom";
import Rout from "./routes";
import Links from "./Link";
import { Props } from "./contextHooks";
// import { uuid } from "uuid";
import { useState } from "react";
export default function App() {
  const [title, setTitle] = useState("new Note");
  const [date, setDate] = useState("Adding content...");
  const [content, setContent] = useState("now");
  const [newNotes, setNewNotes] = useState([]);
  function addNotes(e) {
    e.preventDefault();
    const addedNotes = { title, date, content };
    setNewNotes([...newNotes, addedNotes]);
  }
  return (
    <>
      <div>
        <Props.Provider value={{ addNotes, newNotes }}>
          <Router>
            <Links />
            <Rout />
          </Router>
        </Props.Provider>
      </div>
    </>
  );
}
