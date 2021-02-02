import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import ErrorModal from "./ErrorModal";
import useModal from "./useModal";

function NoteEditor(props) {
  const { isShowing, toggle } = useModal();

  const loadContent = () => {
    const editorContent = document.querySelector(".editor");
    editorContent.innerHTML = noteEdited.content;
  };

  const titleOnChange = (e) => {
    setNoteEdited((prevState) => ({ ...prevState, title: e.target.value }));
  };

  const contentOnBlur = (ev) => {
    setNoteEdited((prevState) => ({
      ...prevState,
      content: ev.target.innerHTML,
    }));
  };

  const save = () => {
    props.getNoteEditedObject(noteEdited);
    props.setIsNote();
  };

  const insertImg = () => {
    const link = prompt("Type URL IMG here");
    const editorContent = document.querySelector(".editor");
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
        try {
          localStorage.setItem("image", base64String);
          const editorContent = document.querySelector(".editor");
          const img = document.createElement("img");
          img.onload = function () {};
          img.src = "data:image/png;base64," + base64String;
          img.classList.add("img-insert");
          editorContent.appendChild(img);
        } catch (e) {
          toggle();
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    loadContent();
  });

  const [noteEdited, setNoteEdited] = useState({
    uuid: props.noteEdit.uuid,
    title: props.noteEdit.title,
    content: props.noteEdit.content,
  });
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
            className="d-none"
          />
        </label>
      </div>
      <div className="single-note-main">
        <input
          className="single-note-main-title"
          defaultValue={props.noteEdit.title}
          onChange={(e) => titleOnChange(e)}
        />
        <div
          className="editor"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={(ev) => contentOnBlur(ev)}
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
      <ErrorModal
        isShowing={isShowing}
        hide={toggle}
        //removeClick={(uuidRemove) => removeClick(uuidRemove)}
      />
    </main>
  );
}

export default NoteEditor;
