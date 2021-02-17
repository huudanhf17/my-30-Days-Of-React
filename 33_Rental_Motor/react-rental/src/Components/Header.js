import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  let user = JSON.parse(localStorage.getItem("user-info"));

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="Header">
      <ul className="Header-ul">
        <Link to="/" className="Header-li Header-home">
          <li className="clickable">HOME</li>{" "}
        </Link>
        <li className="Header-li clickable">PAY IN</li>
        {localStorage.getItem("user-info") ? (
          <li className="Header-li clickable">
            <button className="Header-btn">{user.email}</button>
            <ul className="dropdown-content">
              <li>Profile</li>
              <li onClick={() => logOut()}>Logout</li>
            </ul>
          </li>
        ) : (
          <ul className="Header-ul-ul">
            <Link to="/signup">
              <li className="Header-li Header-user">
                <div className="clickable">SIGN UP</div>
              </li>
            </Link>
            <Link to="/signin">
              <li className="Header-li Header-user bg-dg">
                <div className="clickable">SIGN IN</div>
              </li>
            </Link>
          </ul>
        )}
      </ul>
    </header>
  );
}

export default Header;
