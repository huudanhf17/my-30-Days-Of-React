import React, { Component } from "react";

class Note extends Component {
  substrContent = `${this.props.content.substr(0, 43)}...`;

  render() {
    return (
      <li className="note-main-li">
        <div className="clickable" onClick={() => this.props.changeIsNote()}>
          <h2 className="note-main-ul-li-h2">{this.props.title}</h2>
          <p className="note-main-ul-li-p">{this.substrContent}</p>
        </div>
        <div className="note-main-remove">
          <img src="./img/remove.png" alt="remove" />
        </div>
      </li>
    );
  }
}

export default Note;
