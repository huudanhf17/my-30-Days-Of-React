import React, { useState } from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";

Facebook.propTypes = {};

function Facebook(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  return <div></div>;
}

export default Facebook;
