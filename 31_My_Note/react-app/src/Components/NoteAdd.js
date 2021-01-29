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

  insertImg = () => {
    const link = prompt("Type URL IMG here");
    const editorContent = document.querySelector(".noteadd-content");
    console.log(link);
    const img = document.createElement("img");
    img.src = link;
    editorContent.appendChild(img);
  };

  abc = () => {
    document.getElementById("file").addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        localStorage.setItem("image", base64String);
        const editorContent = document.querySelector(".noteadd-content");
        const img = document.createElement("img");
        img.src = "data:image/png;base64," + base64String;
        editorContent.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };

  render() {
    return (
      <main>
        <div className="single-note-tool">
          <img
            src="./img/insert-img.png"
            alt="insert-img"
            className="single-note-header-tools-insert clickable"
            onClick={() => this.insertImg()}
            title="Insert from URL"
          />

          <label className="NoteAdd-label clickable">
            <img src="./img/insert-img.png" alt="file" title="Insert from PC" />
            <input
              type="file"
              id="file"
              onClick={() => this.abc()}
              className="NoteAdd-input d-none"
            />
          </label>
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
          <img
            src="./img/save.png"
            alt="save"
            className="clickable"
            onClick={() => this.save()}
          />
        </div>
      </main>
    );
  }
}

export default NoteAdd;
