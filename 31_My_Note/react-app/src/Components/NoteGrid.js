import React, { Component } from "react";

class NoteGrid extends Component {
  substrContent = `${this.props.content.substr(0, 56)}...`;

  noteClick = () => {
    this.props.getNoteEdit();
    this.props.changeIsNote();
  };

  render() {
    return (
      <li className="note-main-titles-li-grid">
        <div
          className="note-main-grid-content clickable"
          onClick={() => this.noteClick()}
        >
          <div>{this.substrContent}</div>
          <img
            src="./img/remove.png"
            alt="remove"
            className="note-main-grid-remove"
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
