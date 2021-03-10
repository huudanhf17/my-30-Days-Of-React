import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import "./SignIn.scss";
import PropTypes from "prop-types";

const axios = require("axios").default;
const url = "http://localhost:5000/";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const postData = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: url + "users/signin",
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

  // const fakeAuth = {
  //   isAuthenticated: false,
  //   signin(cb) {
  //     fakeAuth.isAuthenticated = true;
  //     setTimeout(cb, 100); // fake async
  //   },
  //   signout(cb) {
  //     fakeAuth.isAuthenticated = false;
  //     setTimeout(cb, 100);
  //   },
  // };

  // const login = () => {
  //   fakeAuth.authenticate(()=>{
  //     setRedirectToReferrer(true)
  //   })
  // }

  // if (redirectToReferrer){
  //   return <Redirect to ="/"></Redirect>
  // }

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

SignIn.propTypes = {
  getUser: PropTypes.func,
};

export default SignIn;
