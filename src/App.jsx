import { useState } from "react";
import "./App.css";
import NoteContent from "./components/NoteContent";
import Notes from "./components/Notes";

function App() {
  const [selected, setSelected] = useState("");

  const getSelected = (selected) => {
    setSelected(selected);
  };

  return (
    <div className="Notes">
      <Notes onSubmitApp={getSelected} />
      <NoteContent selected={selected} />
    </div>
  );
}

export default App;
