import React from "react";
import Note from "./Note";
import NoteAdd from "./NoteAdd";
import NoteEditor from "./NoteEditor";

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
  if (props.isNote === false && props.isAdd === false) {
    return (
      <main className="note-main">
        <ul className="note-main-ul">{mappingNote()}</ul>
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
