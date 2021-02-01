import React from "react";
import logo from "../logo.svg";

function Footer(props) {
  if (props.isNote === false && props.isAdd === false) {
    return (
      <div>
        <footer className="note-footer">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p className="Footer-count">{props.dataLength} ghi chú</p>
          <div className="note-footer-add">
            <img
              src="./img/add.png"
              alt="add"
              className="clickable"
              onClick={() => props.setIsAdd()}
            />
          </div>
        </footer>
      </div>
    );
  } else {
    return null;
  }
}

export default Footer;
