import React, { Component } from "react";
import logo from "../logo.svg";

class NoteEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: this.props.noteEditObject.uuid,
      title: this.props.noteEditObject.title,
      content: this.props.noteEditObject.content,
    };
  }

  componentDidMount() {
    this.loadContent();
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
    let noteEditedObject = {
      uuid: this.state.uuid,
      title: this.state.title,
      content: this.state.content,
    };
    this.props.getNoteEdited(noteEditedObject);
    this.props.changeIsNote();
  };

  insertImg = () => {
    const link = prompt("Type URL IMG here");
    const editorContent = document.querySelector(".editor");
    console.log(link);
    const img = document.createElement("img");
    img.src = link;
    editorContent.appendChild(img);
  };

  loadContent = () => {
    const editorContent = document.querySelector(".editor");
    editorContent.innerHTML = this.props.noteEditObject.content;
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
        const editorContent = document.querySelector(".editor");
        const img = document.createElement("img");
        img.src = "data:image/png;base64," + base64String;
        editorContent.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };

  render() {
    return (
      <main className="NoteEditor-main">
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
              className="d-none"
            />
          </label>
        </div>
        <div className="single-note-main">
          <input
            className="single-note-main-title"
            defaultValue={this.props.noteEditObject.title}
            onChange={(e) => this.titleOnChange(e)}
          />
          <div
            className="editor"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(ev) => this.contentOnBlur(ev)}
          ></div>
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

export default NoteEditor;
