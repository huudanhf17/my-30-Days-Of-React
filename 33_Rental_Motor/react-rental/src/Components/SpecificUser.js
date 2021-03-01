import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryRentPay from "./HistoryRentPay";
import "./SpecificUser.css";

function SpecificUser(props) {
  const [user, setUser] = useState({});
  const [userUpdated, setUserUpdated] = useState({});

  useEffect(() => {
    async function getCoinsAsync() {
      try {
        const url = "http://localhost:5000/users/" + id;
        const response = await fetch(url);
        const responseJSON = await response.json();
        setUser(responseJSON);
      } catch (err) {
        console.log(`Fail to fetch User: ${err}`);
      }
    }
    getCoinsAsync();
  }, []);

  const { slug, id } = useParams();

  const updateUser = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/users/modify`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          email: userUpdated.email,
          password: userUpdated.password,
          type: userUpdated.type,
        }),
      });
      result = await result.json();
    } catch (err) {
      console.log("Fail to active User " + err);
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
              <input
                className="SpecificUser-input"
                placeholder="Type"
                defaultValue={user.type}
                name="type"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="SpecificUser-form-container-col-div">
              <label className="SpecificUser-label">xxx: </label>
              <input className="SpecificUser-input" placeholder="xxx" />
            </div>
          </div>
        </div>
      </div>
      <div className="SpecificUser-action">
        <button>Cancel</button>
        <button onClick={() => updateUser(id)}>Update</button>
      </div>
      <HistoryRentPay
        coins={props.coins}
        payments={props.payments}
        formatCash={(str) => props.formatCash(str)}
        motorList={props.motorList}
        user={id}
      ></HistoryRentPay>
    </>
  );
}

export default SpecificUser;
