import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import "./Admin.css";
import RefreshMotor from "./RefreshMotor";
import User from "./User";

function Admin(props) {
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
          <li className="Admin-Link">Motor</li>
          <li className="Admin-Link">History of Payments</li>
          <li className="Admin-Link">History of Rental</li>
        </ul>
        <Switch>
          <Route path="/admin/user">
            <User></User>
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
