import React from "react";
import Note from "./Note";
import NoteAdd from "./NoteAdd";
import NoteEditor from "./NoteEditor";
import NoteGrid from "./NoteGrid";

function Main(props) {
  const mappingNote = () =>
    props.dataNotes.map((note, key) => (
      <Note
        title={note.title}
        content={note.content}
        uuid={note.uuid}
        key={key}
        setIsNote={() => props.setIsNote()}
        getNoteEditObject={(object) => props.getNoteEditObject(note)}
        getRemoveUuid={(uuidRemove) => props.getRemoveUuid(uuidRemove)}
      ></Note>
    ));

  const mappingNoteGrid = () =>
    props.dataNotes.map((note, key) => (
      <NoteGrid
        title={note.title}
        content={note.content}
        uuid={note.uuid}
        key={key}
        setIsNote={() => props.setIsNote()}
        getNoteEditObject={(object) => props.getNoteEditObject(note)}
        getRemoveUuid={(uuidRemove) => props.getRemoveUuid(uuidRemove)}
      ></NoteGrid>
    ));
  if (
    props.isNote === false &&
    props.isAdd === false &&
    props.isListView === true
  ) {
    return (
      <main className="note-main">
        <ul className="note-main-ul">{mappingNote()}</ul>
      </main>
    );
  } else if (
    props.isNote === false &&
    props.isAdd === false &&
    props.isListView === false
  ) {
    return (
      <main className="note-main">
        <ul className="note-main-ul-grid">{mappingNoteGrid()}</ul>
      </main>
    );
  } else if (props.isNote) {
    return (
      <NoteEditor
        noteEdit={props.noteEdit}
        getNoteEditedObject={(noteEdited) =>
          props.getNoteEditedObject(noteEdited)
        }
        setIsNote={() => props.setIsNote()}
      ></NoteEditor>
    );
  } else if (props.isAdd) {
    return (
      <NoteAdd
        getNewNote={(note) => props.getNewNote(note)}
        setIsAdd={() => props.setIsAdd()}
      ></NoteAdd>
    );
  }
}

export default Main;
