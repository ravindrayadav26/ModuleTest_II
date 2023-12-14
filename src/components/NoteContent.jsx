// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import style from "../styles/NoteContent.module.css";
import mainImg from "../assets/mainImage.png";
import lock from "../assets/lock.svg";

// eslint-disable-next-line react/prop-types
const NoteSection = ({ noteGroup, selected }) => {
  const [myNote, setMyNote] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(selected)) || [];
    setMyNote(storedNotes);
  }, [selected]);

  const submitNote = async (event) => {
    event.preventDefault();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    const Note = [formattedDate, formattedTime, allNotes];

    const existingGroups = JSON.parse(localStorage.getItem(selected)) || [];

    if (existingGroups.length === 0) {
      localStorage.setItem(selected, JSON.stringify([Note]));
    } else {
      localStorage.setItem(selected, JSON.stringify([...existingGroups, Note]));
    }

    const updatedMyNote = JSON.parse(localStorage.getItem(selected)) || [];
    setMyNote(updatedMyNote);

    setAllNotes("");
  };

  return (
    <>
      <div className={style.header} style={{ backgroundColor: "#001f8b" }}>
        <div className={style.logo} style={{ backgroundColor: noteGroup[2] }}>
          {noteGroup[0]}
        </div>
        <div className={style.name}>{noteGroup[1]}</div>
      </div>
      <div className={style.saved_Notes}>
        {[...myNote].reverse().map((note, index) => (
          <div className={style.note} key={index}>
            {note[2]}
            <div className={style.noteTime}>
              {note[0]} <span></span> {note[1]}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submitNote} className={style.note_write_area}>
        <textarea
          required
          name="note"
          id="note"
          onChange={(event) => {
            setAllNotes(event.target.value);
          }}
          value={allNotes}
          placeholder="Enter your note here..."
        ></textarea>
        <button type="submit" className={style.saveNote}>
          V
        </button>
      </form>
    </>
  );
};

const NoteContent = (props) => {
  const [noteGroup, setNoteGroup] = useState(null);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setSelected(props.selected);

    // eslint-disable-next-line react/prop-types
    if (props.selected) {
      const pocketGroups = JSON.parse(localStorage.getItem("NotesGrp")) || [];

      const matchingGroup = pocketGroups.find(
        // eslint-disable-next-line react/prop-types
        (group) => group[1] === props.selected
      );
      setNoteGroup(matchingGroup);
    }
    // eslint-disable-next-line react/prop-types
  }, [props.selected]);

  return (
    <div className={style.notesArea}>
      {!noteGroup ? (
        <>
          <img className={style.mainImage} src={mainImg} alt="Pocket Notes" />
          <h2>Pocket Notes</h2>
          <p>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
          <p id={style.lock}>
            <img src={lock} alt="encryptLock" />
            end-to-end encrypted
          </p>
        </>
      ) : (
        <NoteSection
          noteGroup={noteGroup}
          selected={selected || ""}
          // eslint-disable-next-line react/prop-types
          setGoBacks={props.setBack}
        />
      )}
    </div>
  );
};

export default NoteContent;
