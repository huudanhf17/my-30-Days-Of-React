import React, { Component } from "react";

class NoteGrid extends Component {
  componentDidMount() {
    this.loadContent();
  }
  loadContent = () => {
    const editorContent = document.getElementById(this.props.uuid);
    editorContent.innerHTML = this.props.content;
  };

  noteClick = () => {
    this.props.getNoteEdit();
    this.props.changeIsNote();
  };

  render() {
    return (
      <li className="note-main-titles-li-grid">
        <div className="note-main-grid-content">
          <div
            className="NoteGrid-summary clickable"
            onClick={() => this.noteClick()}
            id={this.props.uuid}
          ></div>
          <img
            src="./img/remove.png"
            alt="remove"
            className="note-main-grid-remove clickable"
            onClick={(uuidRemove) => this.props.getRemoveUuid(this.props.uuid)}
          />
        </div>
        <h2
          className="note-main-grid-title clickable"
          onClick={() => this.noteClick()}
        >
          {this.props.title}
        </h2>
      </li>
    );
  }
}

export default NoteGrid;
