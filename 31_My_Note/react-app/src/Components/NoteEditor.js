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
    const link = prompt("Nhap URL IMG vao day");
    const editorContent = document.querySelector(".editor");
    console.log(link);
    const img = document.createElement("img");
    img.src = link;
    editorContent.appendChild(img);
  };

  render() {
    return (
      <main>
        <div className="single-note-tool">
          <img
            src="./img/insert-img.png"
            alt="insert-img"
            className="single-note-header-tools-insert"
            onClick={() => this.insertImg()}
          />
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
          >
            {this.props.noteEditObject.content}
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

export default NoteEditor;
