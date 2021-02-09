import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <header className="Header">
      <ul className="Header-ul">
        <Link to="/">
          <li className="Header-li clickable">HOME</li>{" "}
        </Link>
        <li className="Header-li clickable">PAY IN</li>
        <Link to="/signin">
          <li className="Header-li clickable active">SIGN IN</li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
