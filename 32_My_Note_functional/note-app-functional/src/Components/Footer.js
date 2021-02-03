import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../logo.svg";

function Footer(props) {
  if (props.isNote === false && props.isAdd === false) {
    return (
      <Switch>
        <Route exact path="/">
          <div>
            <footer className="note-footer">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <p className="Footer-count">{props.dataLength} ghi chú</p>
              <div className="note-footer-add">
                <Link to="/new">
                  <img src="./img/add.png" alt="add" className="clickable" />
                </Link>
              </div>
            </footer>
          </div>
        </Route>
        <Route path="/grid">
          <div>
            <footer className="note-footer">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <p className="Footer-count">{props.dataLength} ghi chú</p>
              <div className="note-footer-add">
                <Link to="/new">
                  <img src="./img/add.png" alt="add" className="clickable" />
                </Link>
              </div>
            </footer>
          </div>
        </Route>
        <Route path="/new"></Route>
      </Switch>
    );
  } else {
    return null;
  }
}

export default Footer;
