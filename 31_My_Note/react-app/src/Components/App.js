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
      dataNotes: [],
      isListView: true,
      isNote: false,
      noteEditObject: {},
      isAdd: false,
      textSearch: "",
      valueSort: "?",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("dataNotes") === null) {
      localStorage.setItem("dataNotes", JSON.stringify(DataNotes));
    }
    let temp = JSON.parse(localStorage.getItem("dataNotes"));
    this.setState({
      dataNotes: temp,
    });

    if (localStorage.getItem("valueSort") === null) {
      localStorage.setItem("valueSort", 0);
    }
    this.setState({ valueSort: localStorage.getItem("valueSort") * 1 });
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
    localStorage.setItem("dataNotes", JSON.stringify(this.state.dataNotes));
  };

  getRemoveUuid = (uuid) => {
    let temp = this.state.dataNotes.filter((note) => note.uuid !== uuid);
    this.setState({
      dataNotes: temp,
    });
    localStorage.setItem("dataNotes", JSON.stringify(temp));
  };

  getNewNote = (newNoteObject) => {
    this.state.dataNotes.push(newNoteObject);
    localStorage.setItem("dataNotes", JSON.stringify(this.state.dataNotes));
  };

  getSearchInput = (text) => {
    this.setState({
      textSearch: text,
    });
  };

  sortNotesAz = () => {
    let sortNotes = this.state.dataNotes.sort((x, y) =>
      x.title.localeCompare(y.title)
    );
    this.setState({
      dataNotes: sortNotes,
    });
    localStorage.setItem("dataNotes", JSON.stringify(sortNotes));
  };

  sortNotesZa = () => {
    let sortNotes = this.state.dataNotes.sort((x, y) =>
      y.title.localeCompare(x.title)
    );
    this.setState({
      dataNotes: sortNotes,
    });
    localStorage.setItem("dataNotes", JSON.stringify(sortNotes));
  };

  resetSearch = () => {
    this.setState({
      textSearch: "",
    });
  };

  resetSort = () => {
    this.setState({
      valueSort: 0,
    });
  };

  sortNotes = (e) => {
    switch (parseInt(e)) {
      case 0:
        localStorage.setItem("valueSort", 0);
        break;
      case 1:
        this.sortNotesAz();
        localStorage.setItem("valueSort", 1);
        break;
      case 2:
        this.sortNotesZa();
        localStorage.setItem("valueSort", 2);
        break;
      default:
    }
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
          sortNotes={(a) => this.sortNotes(a)}
          resetSearch={() => this.resetSearch()}
          valueSort={this.state.valueSort}
          isAdd={this.state.isAdd}
          changeIsAdd={() => this.changeIsAdd()}
        ></Header>
        <Main
          key={resSearch}
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
          resetSort={() => this.resetSort()}
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
