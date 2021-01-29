import React from "react";
import logo from "../logo.svg";

function Footer(props) {
  return (
    <div>
      <footer className="note-footer">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="Footer-count">?? ghi chú</p>
        <div className="note-footer-add">
          <img
            src="./img/add.png"
            alt="add"
            className="clickable"
            //onClick={() => this.props.changeIsAdd()}
          />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
