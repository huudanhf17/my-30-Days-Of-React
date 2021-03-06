import React, { Component } from "react";
import Note from "./Note";
import NoteAdd from "./NoteAdd";
import NoteEditor from "./NoteEditor";
import NoteGrid from "./NoteGrid";

class Main extends Component {
  mappingNote = () =>
    this.props.dataNotes.map((note, key) => (
      <Note
        title={note.title}
        content={note.content}
        uuid={note.uuid}
        key={key}
        changeIsNote={() => this.props.changeIsNote()}
        getNoteEdit={(noteEdit) => this.props.getNoteEdit(note)}
        getRemoveUuid={(uuidRemove) => this.props.getRemoveUuid(uuidRemove)}
      ></Note>
    ));

  mappingNoteGrid = () =>
    this.props.dataNotes.map((note, key) => (
      <NoteGrid
        title={note.title}
        content={note.content}
        uuid={note.uuid}
        key={key}
        changeIsNote={() => this.props.changeIsNote()}
        getNoteEdit={(noteEdit) => this.props.getNoteEdit(note)}
        getRemoveUuid={(uuidRemove) => this.props.getRemoveUuid(uuidRemove)}
      ></NoteGrid>
    ));

  render() {
    if (
      this.props.isListView &&
      this.props.isNote === false &&
      this.props.isAdd === false
    ) {
      return (
        <main className="note-main">
          <ul className="note-main-ul">{this.mappingNote()}</ul>
        </main>
      );
    } else if (
      this.props.isListView === false &&
      this.props.isNote === false &&
      this.props.isAdd === false
    ) {
      return (
        <main className="note-main">
          <ul className="note-main-ul-grid">{this.mappingNoteGrid()}</ul>
        </main>
      );
    } else if (this.props.isNote) {
      return (
        <NoteEditor
          noteEditObject={this.props.noteEditObject}
          getNoteEdited={(noteEditedObject) =>
            this.props.getNoteEdited(noteEditedObject)
          }
          changeIsNote={() => this.props.changeIsNote()}
        ></NoteEditor>
      );
    } else if (this.props.isAdd) {
      return (
        <NoteAdd
          changeIsAdd={() => this.props.changeIsAdd()}
          getNewNote={(newNote) => this.props.getNewNote(newNote)}
          resetSort={() => this.props.resetSort()}
        ></NoteAdd>
      );
    }
  }
}

export default Main;
