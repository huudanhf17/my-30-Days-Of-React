import "../App.css";
import Footer from "./Footer";
import PreHeader from "./PreHeader";
import Header from "./Header";
import Main from "./Main";
import DataNotes from "./Data.json";
import React, { useEffect, useState } from "react";

function App() {
  const [dataNotes, setDataNotes] = useState([]);
  const [isNote, setIsNote] = useState(false);
  const [noteEdit, setNoteEdit] = useState({});
  const [isAdd, setIsAdd] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [isListView, setIsListView] = useState(true);
  const [valueSort, setValueSort] = useState(-1);

  useEffect(() => {
    if (localStorage.getItem("dataNotes") === null) {
      localStorage.setItem("dataNotes", JSON.stringify(DataNotes));
    }
    let temp = JSON.parse(localStorage.getItem("dataNotes"));
    setDataNotes(temp);

    if (localStorage.getItem("valueSort") === -1) {
      localStorage.setItem("valueSort", 0);
    }
    let tempSort = localStorage.getItem("valueSort");
    setValueSort(tempSort);
  }, []);

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
    localStorage.setItem("dataNotes", JSON.stringify(dataNotes));
  };

  const getRemoveUuid = (uuid) => {
    const temp = dataNotes.filter((note) => note.uuid !== uuid);
    setDataNotes(temp);
    localStorage.setItem("dataNotes", JSON.stringify(temp));
  };

  const getNewNote = (note) => {
    dataNotes.push(note);
    localStorage.setItem("dataNotes", JSON.stringify(dataNotes));
  };

  const getTextSearch = (text) => {
    setTextSearch(text);
  };

  const resSearch = dataNotes.filter(
    (value) =>
      value.title.includes(textSearch) || value.content.includes(textSearch)
  );

  const sortNotesAz = () => {
    resSearch.sort((x, y) => x.title.localeCompare(y.title));
    setDataNotes(resSearch);
    localStorage.setItem("dataNotes", JSON.stringify(resSearch));
  };

  const sortNotesZa = () => {
    resSearch.sort((x, y) => y.title.localeCompare(x.title));
    setDataNotes(resSearch);
    localStorage.setItem("dataNotes", JSON.stringify(resSearch));
  };

  const sortNotes = (e) => {
    switch (parseInt(e)) {
      case 0:
        localStorage.setItem("valueSort", 0);
        break;
      case 1:
        sortNotesAz();
        localStorage.setItem("valueSort", 1);
        break;
      case 2:
        sortNotesZa();
        localStorage.setItem("valueSort", 2);
        break;
      default:
    }
  };

  return (
    <section className="note">
      <PreHeader></PreHeader>
      <Header
        isNote={isNote}
        setIsNote={() => setIsNote(!isNote)}
        isAdd={isAdd}
        setIsAdd={() => setIsAdd(!isAdd)}
        getTextSearch={(text) => getTextSearch(text)}
        isListView={isListView}
        setIsListView={() => setIsListView(!isListView)}
        sortNotes={(e) => sortNotes(e)}
        valueSort={Number(valueSort)}
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
        isListView={isListView}
        setIsListView={() => setIsListView(!isListView)}
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
