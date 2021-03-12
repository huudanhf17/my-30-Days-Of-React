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

  const responseFacebook = (res) => {
    console.log(res);
    setIsLoggedIn(true);
    setUserID(res.userID);
    setName(res.name);
    setEmail(res.email);
    setPicture(res.picture.data.url);
  };

  const componentClicked = () => {
    console.log("clicked");
  };

  let fbContent;

  if (isLoggedIn) {
    fbContent = (
      <div>
        <img src={picture} alt={name}></img>
        <h2>Wellcome {name}</h2>
        <span> {userID}</span>
        Email: {email}
      </div>
    );
  } else {
    fbContent = (
      <FacebookLogin
        appId="725004341385297"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    );
  }

  return <div>{fbContent}</div>;
}

export default Facebook;
