import AppNotes from "./appNotes";
import TextEditor from "./textEditor";
import { Routes, Route } from "react-router-dom";
export default function Rout() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<AppNotes />} />
        <Route exact path="/editor" element={<TextEditor />} />
      </Routes>
    </>
  );
}
