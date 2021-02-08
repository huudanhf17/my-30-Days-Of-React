import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <header className="Header">
      <ul className="Header-ul">
        <li className="Header-li">HOME</li>
        <li className="Header-li">PAY IN</li>
        <li className="Header-li">LOGIN</li>
      </ul>
    </header>
  );
}

export default Header;
