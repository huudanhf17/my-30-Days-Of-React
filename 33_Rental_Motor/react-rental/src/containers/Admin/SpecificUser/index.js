import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import HistoryRentPay from "../../../components/HistoryRentPay/HistoryRentPay";
import "./SpecificUser.scss";
import PropTypes from "prop-types";

const axios = require("axios").default;
const url = "http://localhost:5000/";

function SpecificUser(props) {
  const [user, setUser] = useState({});
  const [userUpdated, setUserUpdated] = useState({});
  const history = useHistory();
  const { slug, id } = useParams();

  useEffect(() => {
    async function getUsersAsync() {
      try {
        const response = await axios(url + "users/" + id);
        const responseJSON = await response.data;
        setUser(responseJSON);
        setUserUpdated(responseJSON);
      } catch (err) {
        console.log(`Fail to axios User: ${err}`);
      }
    }
    getUsersAsync();
  }, []);

  const updateUser = async (id) => {
    try {
      let result = await axios({
        method: "PATCH",
        url: url + "users/modify",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          userId: id,
          email: userUpdated.email,
          password: userUpdated.password,
          type: userUpdated.type,
        },
      });
      result = await result.data;
      history.push("/admin/user");
      props.setRefreshUserList(Math.random());
    } catch (err) {
      console.log("Fail to (axios) active User " + err);
    }
  };

  const handleOnChange = (e) => {
    setUserUpdated((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <h1>Specific User: {user.email}</h1>
      <div className="SpecificUser-form">
        <div className="SpecificUser-form-container">
          <div className="SpecificUser-form-container-col">
            <div className="SpecificUser-form-container-col-div">
              <label className="SpecificUser-label">Email: </label>
              <input
                className="SpecificUser-input"
                placeholder="email"
                defaultValue={user.email}
                name="email"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="SpecificUser-form-container-col-div">
              <label className="SpecificUser-label">New password: </label>
              <input
                className="SpecificUser-input"
                placeholder="New password"
                defaultValue={user.password}
                name="password"
                onChange={(e) => handleOnChange(e)}
              />{" "}
            </div>
          </div>
          <div className="SpecificUser-form-container-col">
            <div className="SpecificUser-form-container-col-div">
              {" "}
              <label className="SpecificUser-label">Type: </label>
              <select
                value={userUpdated.type}
                className="SpecificUser-input"
                name="type"
                onChange={(e) => handleOnChange(e)}
              >
                <option value="admin">Admin</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
                <option value="unactive">Unactive</option>
                <option value="deactivate">Deactivate</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="SpecificUser-action">
        <Link to="/admin/user">
          <button className="btn">Cancel</button>
        </Link>
        <button className="btn btn-green" onClick={() => updateUser(id)}>
          Update
        </button>
      </div>
      <HistoryRentPay
        coins={props.coins}
        payments={props.payments}
        formatCash={(str) => props.formatCash(str)}
        motorList={props.motorList}
        user={id}
        innerTime={(sec) => props.innerTime(sec)}
      ></HistoryRentPay>
    </>
  );
}

SpecificUser.propTypes = {
  coins: PropTypes.array,
  formatCash: PropTypes.func,
  innerTime: PropTypes.func,
  motorList: PropTypes.array,
  payments: PropTypes.array,
  setRefreshUserList: PropTypes.func,
};

export default SpecificUser;
