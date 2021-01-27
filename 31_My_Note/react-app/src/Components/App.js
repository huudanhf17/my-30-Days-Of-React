import "../App.css";
import React, { Component } from "react";
import PreHeader from "./PreHeader";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import DataNotes from "./Data.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataNotes: DataNotes,
      isListView: true,
      isNote: false,
      noteEditObject: {},
      isAdd: false,
      textSearch: "",
    };
  }

  changeView = () => {
    this.setState({
      isListView: !this.state.isListView,
    });
  };

  changeIsNote = () => {
    this.setState({
      isNote: !this.state.isNote,
    });
  };

  changeIsAdd = () => {
    this.setState({
      isAdd: !this.state.isAdd,
    });
  };

  getNoteEdit = (noteEdit) => {
    this.setState({
      noteEditObject: noteEdit,
    });
  };

  getNoteEdited = (noteEditedObject) => {
    this.state.dataNotes.forEach((note) => {
      if (note.uuid === noteEditedObject.uuid) {
        note.title = noteEditedObject.title;
        note.content = noteEditedObject.content;
      }
    });
  };

  getRemoveUuid = (uuid) => {
    this.setState({
      dataNotes: this.state.dataNotes.filter((note) => note.uuid !== uuid),
    });
  };

  getNewNote = (newNoteObject) => {
    this.state.dataNotes.push(newNoteObject);
  };

  getSearchInput = (text) => {
    this.setState({
      textSearch: text,
    });
  };

  render() {
    var resSearch = [];
    this.state.dataNotes.forEach((value) => {
      if (
        value.title.indexOf(this.state.textSearch) !== -1 ||
        value.content.indexOf(this.state.textSearch) !== -1
      ) {
        resSearch.push(value);
      }
    });
    return (
      <section className="note">
        <PreHeader></PreHeader>
        <Header
          isListView={this.state.isListView}
          changeView={() => this.changeView()}
          isNote={this.state.isNote}
          changeIsNote={() => this.changeIsNote()}
          getSearchInput={(text) => this.getSearchInput(text)}
        ></Header>
        <Main
          dataNotes={resSearch}
          isListView={this.state.isListView}
          isNote={this.state.isNote}
          changeIsNote={() => this.changeIsNote()}
          getNoteEdit={(noteEdit) => this.getNoteEdit(noteEdit)}
          noteEditObject={this.state.noteEditObject}
          getNoteEdited={(noteEditedObject) =>
            this.getNoteEdited(noteEditedObject)
          }
          getRemoveUuid={(uuid) => this.getRemoveUuid(uuid)}
          isAdd={this.state.isAdd}
          changeIsAdd={() => this.changeIsAdd()}
          getNewNote={(newNote) => this.getNewNote(newNote)}
        ></Main>
        <Footer
          dataLength={this.state.dataNotes.length}
          isNote={this.state.isNote}
          isAdd={this.state.isAdd}
          changeIsAdd={() => this.changeIsAdd()}
        ></Footer>
      </section>
    );
  }
}

export default App;
