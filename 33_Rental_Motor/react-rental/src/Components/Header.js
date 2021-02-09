import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <header className="Header">
      <ul className="Header-ul">
        <Link to="/">
          <li className="Header-li clickable text-white">HOME</li>{" "}
        </Link>
        <li className="Header-li clickable white-hover">PAY IN</li>
        <Link to="/signin">
          <li className="Header-li clickable white-hover">SIGN IN</li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
