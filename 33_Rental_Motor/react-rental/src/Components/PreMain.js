import React from "react";
import "./PreMain.css";

function PreMain(props) {
  return (
    <div className="PreMain-div">
      <div className="PreMain-div-div">
        <ul className="PreMain-ul">
          <li className="PreMain-li">ALL</li>
          <li className="PreMain-li">MANUAL TRANSMISSION</li>
          <li className="PreMain-li">AUTOMATIC TRANSMISSION</li>
        </ul>
        <ul className="PreMain-ul">
          <li className="PreMain-li">READY</li>
          <li className="PreMain-li">OTHERS</li>
        </ul>
      </div>
    </div>
  );
}

export default PreMain;
