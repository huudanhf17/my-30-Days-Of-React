import React, { useState } from "react";
import logo from "../logo.svg";

function NoteAdd(props) {
  const [newNote, setNewNote] = useState({ uuid: "abcedfg" });

  const titleOnChange = (e) => {
    setNewNote((preState) => ({ ...preState, title: e.target.value }));
  };

  const contentOnBlur = (ev) => {
    setNewNote((preState) => ({ ...preState, content: ev.target.innerHTML }));
  };

  const save = () => {
    props.getNewNote(newNote);
    props.setIsAdd();
  };

  return (
    <main>
      <div className="single-note-tool">
        <img
          src="./img/insert-img.png"
          alt="insert-img"
          className="single-note-header-tools-insert clickable"
          //onClick={() => this.insertImg()}
          title="Insert from URL"
        />

        <label className="NoteAdd-label clickable">
          <img src="./img/insert-img.png" alt="file" title="Insert from PC" />
          <input
            type="file"
            id="file"
            //onClick={() => this.abc()}
            className="NoteAdd-input d-none"
          />
        </label>
      </div>
      <div className="single-note-main">
        <input
          className="single-note-main-title"
          placeholder="Type title here"
          onChange={(e) => titleOnChange(e)}
        />
        <div
          className="noteadd-content"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={(ev) => contentOnBlur(ev)}
          placeholder="Type content here"
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
          onClick={() => save()}
        />
      </div>
    </main>
  );
}

export default NoteAdd;
