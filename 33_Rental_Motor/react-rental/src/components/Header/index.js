import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import PropTypes from "prop-types";
import moment from "moment";
import { UserContext } from "../../contexts/UserContext";
import { GET_USER, LOGOUT_USER } from "../../reducers/type";

const axios = require("axios").default;
// axios.withCredentials = true;
const url = "http://localhost:5000/";

const Header = (props) => {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      let temp = JSON.parse(localStorage.getItem("user-info"));
      let exp = moment(temp.exp);
      let now = moment(Date.now());
      console.log(exp.diff(now));
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, exp.diff(now));
    }
  }, [props.user]);

  const logOut = async () => {
    try {
      await axios.get(`${url}api/user/logout`, { withCredentials: true });
      localStorage.clear();
      window.location.reload();
    } catch (err) {
      console.log(`Fail to Log Out ${err}`);
    }
  };

  const testContext = useContext(UserContext);

  const clickTestContext = () => {
    console.log(testContext);
    testContext.dispatch({
      type: LOGOUT_USER,
    });
    console.log(testContext);
  };

  return (
    <header className="Header">
      <ul className="Header-ul">
        <Link to="/" className="Header-li Header-home">
          <div className="clickable">HOME</div>
        </Link>
        <button onClick={clickTestContext}></button>
        <li className="Header-li clickable">PAY IN</li>
        {localStorage.getItem("user-info") ? (
          <li className="Header-li Header-user clickable">
            <div className="Header-user-div">
              <button className="Header-btn" key={props.user.coins}>
                {props.user.email}{" "}
                <span className="Header-coins">
                  {" "}
                  {props.formatCash(`${props.user.coins}`)}đ
                </span>
              </button>
              <img src="./img/caret.png" className="Header-caret" alt="" />
            </div>
            <ul className="dropdown-content">
              {props.user.type === "admin" ? (
                <Link to="/admin/">
                  <li>Admin</li>
                </Link>
              ) : null}
              <Link to="/history-rent-pay">
                <li>History</li>
              </Link>
              <li onClick={() => logOut()}>Logout</li>
            </ul>
          </li>
        ) : (
          <ul className="Header-ul-ul">
            <Link to="/signup">
              <li className="Header-li Header-user">
                <div className="text-center clickable">SIGN UP</div>
              </li>
            </Link>
            <Link to="/signin">
              <li className="Header-li Header-user bg-dg">
                <div className="text-center clickable">SIGN IN</div>
              </li>
            </Link>
          </ul>
        )}
      </ul>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    __v: PropTypes.number,
    _id: PropTypes.string,
    coins: PropTypes.number,
    created_at: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    type: PropTypes.string,
    updated_at: PropTypes.string,
  }),
  formatCash: PropTypes.func,
};

export default Header;
