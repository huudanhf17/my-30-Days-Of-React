import React, { Component } from "react";

class Note extends Component {
  componentDidMount() {
    this.loadContent();
  }
  loadContent = () => {
    const editorContent = document.getElementById(this.props.uuid);
    editorContent.innerHTML = this.props.content;
  };

  noteClick = () => {
    this.props.changeIsNote();
    this.props.getNoteEdit();
  };

  render() {
    return (
      <li className="note-main-li">
        <div className="Note-li-div" onClick={() => this.noteClick()}>
          <h2 className="note-main-ul-li-h2">{this.props.title}</h2>
          <p className="note-main-ul-li-p" id={this.props.uuid}></p>
        </div>
        <div className="note-main-remove">
          <img
            src="./img/remove.png"
            alt="remove"
            className="clickable"
            onClick={(uuidRemove) => this.props.getRemoveUuid(this.props.uuid)}
          />
        </div>
      </li>
    );
  }
}

export default Note;
