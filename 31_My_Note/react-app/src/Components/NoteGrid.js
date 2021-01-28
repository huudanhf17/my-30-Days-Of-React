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
        <div className="note-main-grid-content">
          <div className="clickable" onClick={() => this.noteClick()}>
            {this.substrContent}
          </div>
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
