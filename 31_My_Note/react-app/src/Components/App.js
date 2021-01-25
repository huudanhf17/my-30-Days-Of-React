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
      isNote: true,
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
