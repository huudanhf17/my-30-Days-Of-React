import React, { Component } from "react";
import logo from "../logo.svg";

class NoteAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: this.userIdGeneratedByUser(),
      title: "",
      content: "",
    };
  }

  titleOnChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  contentOnBlur = (ev) => {
    this.setState({
      content: ev.target.innerHTML,
    });
  };

  save = () => {
    let newNote = {
      uuid: this.state.uuid,
      title: this.state.title,
      content: this.state.content,
    };
    this.props.getNewNote(newNote);
    this.props.changeIsAdd();
    this.props.resetSort();
  };

  userIdGeneratedByUser = () => {
    let randomString =
      "~!@#$%^&*())_+`-=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 5; i++) {
      id += randomString[Math.floor(Math.random() * (randomString.length - 1))];
    }
    return id;
  };

  render() {
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
          <input
            className="single-note-main-title"
            placeholder="Type title here"
            onChange={(e) => this.titleOnChange(e)}
          />
          <div
            className="noteadd-content"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(ev) => this.contentOnBlur(ev)}
          >
            Type content here
          </div>
        </div>
        <div className="note-editor-footer">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <img src="./img/save.png" alt="save" onClick={() => this.save()} />
        </div>
      </main>
    );
  }
}

export default NoteAdd;
