import React, { Component } from "react";
import logo from "../logo.svg";

class Footer extends Component {
  render() {
    if (this.props.isNote === false) {
      return (
        <footer className="note-footer">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p>{this.props.dataLength} ghi chú</p>
          <div className="note-footer-add">
            <img src="./img/add.png" alt="add" />
          </div>
        </footer>
      );
    } else {
      return null;
    }
  }
}

export default Footer;
