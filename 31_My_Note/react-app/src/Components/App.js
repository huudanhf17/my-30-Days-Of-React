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

  render() {
    return (
      <section className="note">
        <PreHeader></PreHeader>
        <Header
          isListView={this.state.isListView}
          changeView={() => this.changeView()}
          isNote={this.state.isNote}
          changeIsNote={() => this.changeIsNote()}
        ></Header>
        <Main
          dataNotes={this.state.dataNotes}
          isListView={this.state.isListView}
          isNote={this.state.isNote}
          changeIsNote={() => this.changeIsNote()}
          getNoteEdit={(noteEdit) => this.getNoteEdit(noteEdit)}
          noteEditObject={this.state.noteEditObject}
          getNoteEdited={(noteEditedObject) =>
            this.getNoteEdited(noteEditedObject)
          }
          getRemoveUuid={(uuid) => this.getRemoveUuid(uuid)}
        ></Main>
        <Footer
          dataLength={this.state.dataNotes.length}
          isNote={this.state.isNote}
        ></Footer>
      </section>
    );
  }
}

export default App;
