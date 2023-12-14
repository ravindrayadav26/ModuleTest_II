/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import styles from "../styles/Notes.module.css";
import NewGroup from "./CreateNote";

const Notes = (props) => {
  const [noteGroups, setNoteGroups] = useState([]);
  const [selectNote, setSelectNote] = useState("");

  useEffect(() => {
    const allGroups = JSON.parse(localStorage.getItem("NotesGrp")) || [];
    setNoteGroups(allGroups);
  }, []);

  const setNote = (name) => {
    setSelectNote(name);
    // eslint-disable-next-line react/prop-types
    props.onSubmitApp(name);
    // eslint-disable-next-line react/prop-types
    props.setBack(false);
  };

  // eslint-disable-next-line react/prop-types
  return (
    <>
      <div
        className={`${styles.note_groups_leftSide} ${
          !props.back ? styles.mobile_view : ""
        }`}
      >
        <h1>Pocket Notes</h1>
        <div className={styles.notes}>
          {noteGroups.length !== 0 ? (
            ""
          ) : (
            <div className={styles.note_group}>
              <h2>Add new note group</h2>
              <p>
                No groups available. Click on the below plus button to add new
                group.
              </p>
            </div>
          )}
          {noteGroups.map((group, index) => (
            <div
              className={styles.note}
              style={{
                backgroundColor:
                  selectNote === group[1] ? "rgba(0, 0, 0, 0.158)" : "",
              }}
              key={index}
              onClick={() => setNote(group[1])}
            >
              <div
                className={styles.noteLogo}
                style={{ backgroundColor: group[2] }}
              >
                {group[0]}
              </div>
              <div className={styles.note_name}>{group[1]}</div>
            </div>
          ))}
          <NewGroup newGroup={setNoteGroups} />
        </div>
      </div>
    </>
  );
};

export default Notes;
