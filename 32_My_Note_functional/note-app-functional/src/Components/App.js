import "../App.css";
import Footer from "./Footer";
import PreHeader from "./PreHeader";
import Header from "./Header";
import Main from "./Main";
import DataNotes from "./Data.json";
import React, { useState } from "react";

function App() {
  const [dataNotes, setDataNotes] = useState(DataNotes);
  const [isNote, setIsNote] = useState(false);
  const [noteEdit, setNoteEdit] = useState({});
  const [isAdd, setIsAdd] = useState(false);
  const [textSearch, setTextSearch] = useState("");

  const getNoteEditObject = (note) => {
    setNoteEdit(note);
  };

  const getNoteEditedObject = (noteEdited) => {
    dataNotes.forEach((value) => {
      if (value.uuid === noteEdited.uuid) {
        value.title = noteEdited.title;
        value.content = noteEdited.content;
      }
    });
  };

  const getRemoveUuid = (uuid) => {
    const temp = dataNotes.filter((note) => note.uuid !== uuid);
    setDataNotes(temp);
  };

  const getNewNote = (note) => {
    dataNotes.push(note);
  };

  const getTextSearch = (text) => {
    setTextSearch(text);
  };

  const resSearch = dataNotes.filter(
    (value) =>
      value.title.includes(textSearch) || value.content.includes(textSearch)
  );

  return (
    <section className="note">
      <Header
        isNote={isNote}
        setIsNote={() => setIsNote(!isNote)}
        isAdd={isAdd}
        setIsAdd={() => setIsAdd(!isAdd)}
        getTextSearch={(text) => getTextSearch(text)}
      ></Header>
      <Main
        dataNotes={resSearch}
        isNote={isNote}
        setIsNote={() => setIsNote(!isNote)}
        getNoteEditObject={(note) => getNoteEditObject(note)}
        noteEdit={noteEdit}
        getNoteEditedObject={(noteEdited) => getNoteEditedObject(noteEdited)}
        getRemoveUuid={(uuid) => getRemoveUuid(uuid)}
        isAdd={isAdd}
        getNewNote={(note) => getNewNote(note)}
        setIsAdd={() => setIsAdd(!isAdd)}
      ></Main>
      <Footer
        dataLength={dataNotes.length}
        isNote={isNote}
        isAdd={isAdd}
        setIsAdd={() => setIsAdd(!isAdd)}
      ></Footer>
    </section>
  );
}

export default App;
