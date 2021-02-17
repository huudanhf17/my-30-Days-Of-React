import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./SignUp.css";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const postData = async () => {
    try {
      let result = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      localStorage.setItem(
        "user-info",
        JSON.stringify({
          email: email,
          password: password,
        })
      );
      history.push("/");
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="SignUp-div">
      <form className="SignUp-container">
        <h1>Create your Account</h1>
        <p>to continue to Rental Motor</p>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br></br>
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <ul className="SignUp-ul">
          <Link to="/signin">
            <li className="btn-dg">Sign in instead</li>
          </Link>
          <li className="btn-bg-dg" onClick={() => postData()}>
            Sign Up
          </li>
        </ul>
      </form>
      <div className="SignUp-div2">.....</div>
    </div>
  );
}

export default SignUp;
