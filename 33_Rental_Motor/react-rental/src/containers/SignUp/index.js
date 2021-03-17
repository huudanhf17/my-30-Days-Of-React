import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./SignUp.scss";
import PropTypes from "prop-types";

const axios = require("axios").default;
const url = "http://localhost:5000/";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const postData = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: url + "api/user/register",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          password: password,
        },
      });
      signIn();
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async () => {
    try {
      let result = await axios({
        method: "POST",
        withCredentials: true,
        url: url + "api/user/login",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          password: password,
        },
      });
      result = await result.data;

      props.getUser(result);
      history.push("/");
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

SignUp.propTypes = {
  getUser: PropTypes.func,
};

export default SignUp;
