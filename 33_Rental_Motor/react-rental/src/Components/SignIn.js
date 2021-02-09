import React from "react";
import "./SignIn.css";

function SignIn(props) {
  return (
    <div className="SignIn-div">
      <div className="SignIn-container">
        <h1>Sign In</h1>
        <p>to continue to Rental Motor</p>
        <input placeholder="Email"></input>
        <br></br>
        <input placeholder="Password"></input>
        <ul className="SignIn-ul">
          <li className="btn-dg">Create Account</li>
          <li className="btn-bg-dg">Sign In</li>
        </ul>
      </div>
    </div>
  );
}

export default SignIn;
