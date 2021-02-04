import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import Note from "./Note";
import NoteAdd from "./NoteAdd";
import NoteEditor from "./NoteEditor";
import NoteGrid from "./NoteGrid";

function MyRouter(props) {
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
  return (
    <div>
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        <Route exact path="/">
          <main className="note-main">
            <ul className="note-main-ul">{mappingNote()}</ul>
          </main>
        </Route>
        <Route path="/grid">
          <main className="note-main">
            <ul className="note-main-ul-grid">{mappingNoteGrid()}</ul>
          </main>
        </Route>
        <Route path="/:slug.:id">
          <NoteEditor
            noteEdit={props.noteEdit}
            getNoteEditedObject={(noteEdited) =>
              props.getNoteEditedObject(noteEdited)
            }
            setIsNote={() => props.setIsNote()}
          ></NoteEditor>
        </Route>
        <Route exact path="/new">
          <NoteAdd
            getNewNote={(note) => props.getNewNote(note)}
            setIsAdd={() => props.setIsAdd()}
          ></NoteAdd>
        </Route>
      </Switch>
    </div>
  );
}

export default MyRouter;
