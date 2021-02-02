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

  const insertImg = () => {
    const link = prompt("Type URL IMG here");
    const editorContent = document.querySelector(".noteadd-content");
    const img = document.createElement("img");
    img.src = link;
    editorContent.appendChild(img);
  };

  const insertImgFromFile = () => {
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
        img.classList.add("img-insert");
        editorContent.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <main className="NoteEditor-main">
      <div className="single-note-tool">
        <img
          src="./img/image.png"
          alt="insert-img"
          className="single-note-header-tools-insert clickable"
          onClick={() => insertImg()}
          title="Insert from URL"
        />

        <label className="NoteAdd-label clickable">
          <img src="./img/upload.png" alt="file" title="Insert from PC" />
          <input
            type="file"
            id="file"
            onClick={() => insertImgFromFile()}
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
