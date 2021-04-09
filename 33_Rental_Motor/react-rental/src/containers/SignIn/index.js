import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Facebook from "../../components/Facebook/Facebook";
import axios from "axios";

import "./SignIn.scss";

// const cookies = new Cookies();

axios.defaults.withCredentials = true;
const url = "http://localhost:5000/";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const postSignIn = async () => {
    try {
      let result = await axios({
        method: "POST",
        withCredentials: true,
        credentials: "include",
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
      result.exp = new Date(Date.now() + 1_889_231_000);
      props.getUser(result);
      history.location.state
        ? history.push(history.location.state.from.pathname)
        : history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const createCookie = () => {
    axios
      .get("http://localhost:5000/testc", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      });
  };

  const clearCookie = () => {
    axios
      .get("http://localhost:5000/clearCookie", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      });
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
          <li className="btn-bg-dg" onClick={postSignIn}>
            Sign In
          </li>
        </ul>
      </div>
      <div className="SignIn-div2">
        <h2>Facebook</h2>
        <Facebook></Facebook>
      </div>
      <button onClick={createCookie}>Create Cookie</button>
      <button onClick={clearCookie}>Clear Cookie</button>
    </div>
  );
}

SignIn.propTypes = {
  getUser: PropTypes.func,
};

export default SignIn;
