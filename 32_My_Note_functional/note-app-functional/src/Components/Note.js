import React, { useEffect } from "react";
import Modal from "./Modal";
import useModal from "./useModal";

function Note(props) {
  const { isShowing, toggle } = useModal();

  const loadContent = () => {
    const editorContent = document.getElementById(props.uuid);
    editorContent.innerHTML = props.content;
  };

  useEffect(() => {
    loadContent();
  });

  const noteClick = () => {
    props.setIsNote();
    props.getNoteEditObject();
  };

  const removeClick = () => {
    props.getRemoveUuid(props.uuid);
    toggle();
  };
  return (
    <li className="note-main-li">
      <div className="Note-li-div" onClick={() => noteClick()}>
        <h2 className="note-main-ul-li-h2">{props.title}</h2>
        <p className="note-main-ul-li-p" id={props.uuid}></p>
      </div>
      <div className="note-main-remove">
        <img
          src="./img/remove.png"
          alt="remove"
          className="clickable"
          //onClick={(uuidRemove) => props.getRemoveUuid(props.uuid)}
          onClick={toggle}
        />
        <Modal
          isShowing={isShowing}
          hide={toggle}
          removeClick={(uuidRemove) => removeClick(uuidRemove)}
        />
      </div>
    </li>
  );
}

export default Note;
