import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./SignIn.css";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const postData = async () => {
    try {
      let result = await fetch("http://localhost:5000/users/signin", {
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
      result = await result.json();
      if (result.password === password) {
        props.getUser(result);
        history.push("/");
      } else {
        console.log(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="SignIn-div">
      <div className="SignIn-container">
        <h1>Sign In</h1>
        <p>to continue to Rental Motor</p>
        <input
          placeholder="Email"
          className="SignIn-input"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br></br>
        <input
          placeholder="Password"
          className="SignIn-input"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <ul className="SignIn-ul">
          <Link to="/signup">
            <li className="btn-dg">Create Account</li>
          </Link>
          <li className="btn-bg-dg" onClick={() => postData()}>
            Sign In
          </li>
        </ul>
      </div>
      <div className="SignIn-div2">.....</div>
    </div>
  );
}

export default SignIn;
