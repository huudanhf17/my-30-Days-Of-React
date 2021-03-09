import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Header.scss";

function Header(props) {
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
          <li className="Header-li Header-user clickable">
            <button className="Header-btn" key={props.user.coins}>
              {props.user.email}{" "}
              <span className="Header-coins">
                {" "}
                {props.formatCash(`${props.user.coins}`)}đ
              </span>
            </button>
            <img src="./img/caret.png" className="Header-caret" alt="" />
            <ul className="dropdown-content">
              <Link to="/admin/">
                <li>Admin</li>
              </Link>
              <Link to="/history-rent-pay">
                <li>History</li>
              </Link>
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
