// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "../styles/CreateNote.module.css";

const CreateNote = (props) => {
  const colorOptions = [
    {
      id: 1,
      value: "#0047ff",
    },
    {
      id: 2,
      value: "#b38bfa",
    },
    {
      id: 3,
      value: "#ff79f2",
    },
    {
      id: 4,
      value: "#43e6fc",
    },
    {
      id: 5,
      value: "#f19576",
    },
    {
      id: 6,
      value: "#6691ff",
    },
  ];

  const [selectedColor, setSelectedColor] = useState("#0047ff");
  const [group, setGroup] = useState(false);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleColorChange = (colorValue) => {
    setSelectedColor(colorValue);
  };

  const addGroup = async (event) => {
    event.preventDefault();

    if (name && selectedColor) {
      const words = name.split(" ");

      const firstLetterFirstWord = words[0] ? words[0][0] : "";

      const lastWordIndex = words.length - 1;
      const firstLetterLastWord = words[lastWordIndex]
        ? words[lastWordIndex][0]
        : "";
      let logoName = "";
      if (lastWordIndex > 0) {
        logoName = (firstLetterFirstWord + firstLetterLastWord).toUpperCase();
      } else {
        logoName = firstLetterFirstWord.toUpperCase();
      }

      const newGroup = [logoName, name, selectedColor];
      const existingGroups = JSON.parse(localStorage.getItem("NotesGrp")) || [];

      const nameExists = existingGroups.some((group) => group[1] === name);

      if (nameExists) {
        setErrorMessage("Group with this name already exists!");
      } else {
        if (existingGroups.length === 0) {
          localStorage.setItem("NotesGrp", JSON.stringify([newGroup]));
        } else {
          localStorage.setItem(
            "NotesGrp",
            JSON.stringify([...existingGroups, newGroup])
          );
        }
        const newNoteGroups =
          JSON.parse(localStorage.getItem("NotesGrp")) || [];
        // eslint-disable-next-line react/prop-types
        props.newGroup(newNoteGroups);
        setErrorMessage("");
        setName("");
        setGroup(false);
      }
    }
  };

  return (
    <>
      <div
        className={styles.addGroup}
        onClick={() => (group ? setGroup(false) : setGroup(true))}
      >
        +
      </div>

      {group ? (
        <div className={styles.create_group_section}>
          <div className={styles.create_note_popup}>
            <h2>Create New group</h2>
            <form onSubmit={addGroup}>
              <div className={styles.input_name_color}>
                <div className={styles.inputLabel}>Group Name</div>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  required
                  placeholder="Enter group name"
                />
                <p className={styles.error}>{errorMessage}</p>
              </div>
              <div className={styles.input_name_color}>
                <div className={styles.inputLabel}>Choose colour</div>
                <div className={styles.inputColor}>
                  {colorOptions.map((color) => (
                    <div key={color.id}>
                      <input
                        type="radio"
                        id={color.id}
                        name="fav_language"
                        value={color.value}
                        checked={selectedColor === color.value}
                        onChange={() => handleColorChange(color.value)}
                      />
                      <label
                        className={styles.colorCircle}
                        style={{ backgroundColor: color.value }}
                        htmlFor={color.id}
                      >
                        {selectedColor === color.value && (
                          <span className={styles.selected}>&#10003;</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className={styles.inputButton}>
                Create
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CreateNote;
