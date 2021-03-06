import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import HistoryPayments from "../../components/HistoryPayments";
import HistoryRentals from "../../components/HistoryRentals";
import "./Admin.scss";
import Motor from "./Motor";
import NewMotor from "./NewMotor";
import RefreshMotor from "./RefreshMotor";
import SpecificMotor from "./SpecificMotor";
import SpecificUser from "./SpecificUser";
import User from "./User";
import moment from "moment";
import PropTypes from "prop-types";

const axios = require("axios").default;
const url = "http://localhost:5000/";

function Admin(props) {
  const [userList, setUserList] = useState([]);
  const [refreshUserList, setRefreshUserList] = useState(0);

  useEffect(() => {
    async function getUserListAsync() {
      try {
        const response = await axios.get(url + "users");
        setUserList(response.data);
      } catch (err) {
        console.log(`Fail to axios Coins List: ${err}`);
      }
    }
    getUserListAsync();
  }, [refreshUserList]);

  const handleUserEmail = (userId) => {
    let res = "";
    userList.forEach((value) => {
      if (value._id === userId) {
        res = value.email;
      }
    });
    return res;
  };

  const renderTime = (utc) => {
    /* -------PureJs--------- */
    // let d = new Date(
    //   utc.substr(0, 4),
    //   utc.substr(5, 2) - 1,
    //   utc.substr(8, 2),
    //   utc.substr(11, 2),
    //   utc.substr(14, 2),
    //   utc.substr(17, 2)
    // );
    // d.setHours(d.getHours() + 7);
    // const year = d.getFullYear();
    // const month = `0${d.getMonth() + 1}`;
    // const day = `0${d.getDate()}`;
    // const hours = "0" + d.getHours();
    // const minutes = "0" + d.getMinutes();
    // return `${hours.substr(-2)}:${minutes.substr(-2)} ${day.substr(
    //   -2
    // )}/${month.substr(-2)}/${year}`;

    //MomentJs
    return moment.utc(utc).local().format("HH:mm DD-MM-YYYY");
  };

  return (
    <div className="Admin-div">
      <div className="Admin-container">
        <ul className="Admin-menu">
          <NavLink
            to="/admin/"
            activeClassName=" text-danger bg-dark"
            className="Admin-Link no-margin-left"
          >
            Refresh Motor
          </NavLink>
          <NavLink
            to="/admin/user"
            activeClassName=" text-danger bg-dark"
            className="Admin-Link"
          >
            User
          </NavLink>
          <NavLink
            to="/admin/motor"
            activeClassName=" text-danger bg-dark"
            className="Admin-Link"
          >
            Motor
          </NavLink>
          <NavLink
            to="/admin/payments"
            activeClassName=" text-danger bg-dark"
            className="Admin-Link"
          >
            History of Payments
          </NavLink>
          <NavLink
            to="/admin/rentals"
            activeClassName=" text-danger bg-dark"
            className="Admin-Link"
          >
            History of Rentals
          </NavLink>
        </ul>
        <Switch>
          <Route path="/admin/user/:slug.:id">
            <SpecificUser
              coins={props.coins}
              payments={props.payments}
              formatCash={(str) => props.formatCash(str)}
              motorList={props.motorList}
              innerTime={(sec) => props.innerTime(sec)}
              setRefreshUserList={(num) => setRefreshUserList(num)}
            ></SpecificUser>
          </Route>
          <Route path="/admin/user">
            <User
              userList={userList}
              coins={props.coins}
              payments={props.payments}
              formatCash={(str) => props.formatCash(str)}
              motorList={props.motorList}
              splitTime={(seconds, unit) => props.splitTime(seconds, unit)}
              setRefreshData={(num) => props.setRefreshData(num)}
              setRefreshUserList={(num) => setRefreshUserList(num)}
            ></User>
          </Route>
          <Route path="/admin/motor/:slug.:id">
            <SpecificMotor
              payments={props.payments}
              formatCash={(str) => props.formatCash(str)}
              innerTime={(sec) => props.innerTime(sec)}
              handleUserEmail={(id) => handleUserEmail(id)}
              renderTime={(utc) => renderTime(utc)}
              setRefreshData={(num) => props.setRefreshData(num)}
            ></SpecificMotor>
          </Route>
          <Route path="/admin/motor/add">
            <NewMotor
              setRefreshData={(num) => props.setRefreshData(num)}
            ></NewMotor>
          </Route>
          <Route path="/admin/motor">
            <Motor
              motorList={props.motorList}
              payments={props.payments}
              formatCash={(str) => props.formatCash(str)}
              splitTime={(seconds, unit) => props.splitTime(seconds, unit)}
              userList={userList}
              handleUserEmail={(id) => handleUserEmail(id)}
              renderTime={(utc) => renderTime(utc)}
              setRefreshData={(num) => props.setRefreshData(num)}
              setRefreshUserList={(num) => setRefreshUserList(num)}
            ></Motor>
          </Route>
          <Route path="/admin/payments">
            <HistoryPayments
              coins={props.coins}
              renderTime={(utc) => renderTime(utc)}
              formatCash={(str) => props.formatCash(str)}
              handleUserEmail={(id) => handleUserEmail(id)}
            ></HistoryPayments>
          </Route>
          <Route path="/admin/rentals">
            <HistoryRentals
              payments={props.payments}
              renderTime={(utc) => renderTime(utc)}
              formatCash={(str) => props.formatCash(str)}
              handleUserEmail={(id) => handleUserEmail(id)}
              innerTime={(sec) => props.innerTime(sec)}
            ></HistoryRentals>
          </Route>
          <Route path="/admin">
            <RefreshMotor
              motorListMaintance={props.motorListMaintance}
              setRefreshData={(num) => props.setRefreshData(num)}
            ></RefreshMotor>
          </Route>
        </Switch>
      </div>
      <div className="Admin-div2">.....</div>
    </div>
  );
}

Admin.propTypes = {
  coins: PropTypes.array,
  formatCash: PropTypes.func,
  innerTime: PropTypes.func,
  motorList: PropTypes.array,
  motorListMaintance: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  payments: PropTypes.array,
  setRefreshData: PropTypes.func,
  splitTime: PropTypes.func,
};

export default Admin;
