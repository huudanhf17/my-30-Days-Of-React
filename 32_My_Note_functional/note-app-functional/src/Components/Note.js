import React, { useEffect } from "react";
import Modal from "./Modal";
import useModal from "./useModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    props.getNoteEditObject();
  };

  const removeClick = () => {
    props.getRemoveUuid(props.uuid);
    toggle();
  };

  const ChangeToSlug = (slug) => {
    slug = slug.toLowerCase();
    slug = slug.replace(/ /gi, "-");

    return slug;
  };
  return (
    <li className="note-main-li">
      <div className="Note-li-div" onClick={() => noteClick()}>
        <Link to={`/${ChangeToSlug(props.title)}.${props.uuid}`}>
          <h2 className="note-main-ul-li-h2">{props.title}</h2>
          <p className="note-main-ul-li-p" id={props.uuid}></p>
        </Link>
      </div>
      <div className="note-main-remove">
        <img
          src="./img/remove.png"
          alt="remove"
          className="clickable"
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
