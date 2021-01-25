import React, { Component } from "react";
import Note from "./Note";
import NoteGrid from "./NoteGrid";

class Main extends Component {
  mappingNote = () =>
    this.props.dataNotes.map((note, key) => (
      <Note
        title={note.title}
        content={note.content}
        key={key}
        changeIsNote={() => this.props.changeIsNote()}
      ></Note>
    ));

  mappingNoteGrid = () =>
    this.props.dataNotes.map((note, key) => (
      <NoteGrid
        title={note.title}
        content={note.content}
        key={key}
        changeIsNote={() => this.props.changeIsNote()}
      ></NoteGrid>
    ));

  render() {
    if (this.props.isListView && this.props.isNote === false) {
      return (
        <main className="note-main">
          <ul className="note-main-ul">{this.mappingNote()}</ul>
        </main>
      );
    } else if (this.props.isListView === false && this.props.isNote === false) {
      return (
        <main className="note-main">
          <ul className="note-main-ul-grid">{this.mappingNoteGrid()}</ul>
        </main>
      );
    } else if (this.props.isNote) {
      return (
        <main>
          <div className="single-note-tool">
            <img
              src="./img/insert-img.png"
              alt="insert-img"
              className="single-note-header-tools-insert"
            />
          </div>
          <div className="single-note-main">
            <h2 className="single-note-main-title">State and Lifecycle</h2>
            <div contentEditable="true">
              This page introduces the concept of state and lifecycle in a React
              component. You can find a detailed component API reference here.
              <br />
              Consider the ticking clock example from one of the previous
              sections. In Rendering Elements, we have only learned one way to
              update the UI. We call ReactDOM.render() to change the rendered
              output:
              <img src="./img/img.png" />
            </div>
          </div>
        </main>
      );
    }
  }
}

export default Main;
