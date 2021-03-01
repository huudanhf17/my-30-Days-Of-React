import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import "./Admin.css";
import Motor from "./Motor";
import RefreshMotor from "./RefreshMotor";
import SpecificUser from "./SpecificUser";
import User from "./User";

function Admin(props) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function getUserListAsync() {
      try {
        const url = "http://localhost:5000/users/";
        const response = await fetch(url);
        const responseJSON = await response.json();
        setUserList(responseJSON);
      } catch (err) {
        console.log(`Fail to fetch Coins List: ${err}`);
      }
    }
    getUserListAsync();
  }, []);

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
          <li className="Admin-Link">History of Payments</li>
          <li className="Admin-Link">History of Rental</li>
        </ul>
        <Switch>
          <Route path="/admin/user/:slug.:id">
            <SpecificUser
              coins={props.coins}
              payments={props.payments}
              formatCash={(str) => props.formatCash(str)}
              motorList={props.motorList}
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
            ></User>
          </Route>
          <Route path="/admin/motor">
            <Motor></Motor>
          </Route>
          <Route path="/admin">
            <RefreshMotor
              motorListMaintance={props.motorListMaintance}
            ></RefreshMotor>
          </Route>
        </Switch>
      </div>
      <div className="Admin-div2">.....</div>
    </div>
  );
}

export default Admin;
