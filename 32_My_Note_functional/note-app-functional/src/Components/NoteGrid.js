import React, { useEffect } from "react";
import Modal from "./Modal";
import useModal from "./useModal";

function NoteGrid(props) {
  useEffect(() => {
    loadContent();
  });

  const { isShowing, toggle } = useModal();

  const noteClick = () => {
    props.getNoteEditObject();
    props.setIsNote();
  };

  const removeClick = () => {
    props.getRemoveUuid(props.uuid);
    toggle();
  };

  const loadContent = () => {
    const editorContent = document.getElementById(props.uuid);
    editorContent.innerHTML = props.content;
  };

  return (
    <li className="note-main-titles-li-grid">
      <div className="note-main-grid-content">
        <div
          className="NoteGrid-summary clickable"
          onClick={() => noteClick()}
          id={props.uuid}
        ></div>
        <img
          src="./img/remove.png"
          alt="remove"
          className="note-main-grid-remove clickable"
          onClick={toggle}
        />
        <Modal
          isShowing={isShowing}
          hide={toggle}
          removeClick={(uuidRemove) => removeClick(uuidRemove)}
        />
      </div>
      <h2
        className="note-main-grid-title clickable"
        onClick={() => noteClick()}
      >
        {props.title}
      </h2>
    </li>
  );
}

export default NoteGrid;
