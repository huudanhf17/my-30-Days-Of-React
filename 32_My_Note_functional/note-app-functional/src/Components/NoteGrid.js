import React, { useEffect } from "react";
import Modal from "./Modal";
import useModal from "./useModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function NoteGrid(props) {
  useEffect(() => {
    loadContent();
  });

  const { isShowing, toggle } = useModal();

  const noteClick = () => {
    props.getNoteEditObject();
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
        <Link to={`/${props.title}.${props.uuid}`} className="text-content">
          <div
            className="NoteGrid-summary clickable"
            onClick={() => noteClick()}
            id={props.uuid}
          ></div>
        </Link>
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
      <Link to={`/${props.title}.${props.uuid}`} className="text-title">
        <h2
          className="note-main-grid-title clickable"
          onClick={() => noteClick()}
        >
          {props.title}
        </h2>
      </Link>
    </li>
  );
}

export default NoteGrid;
