import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NewMotor.scss";

const axios = require("axios").default;
const url = "http://localhost:5000/";

function NewMotor(props) {
  const [newMotor, setNewMotor] = useState({});
  const history = useHistory();

  const postData = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: url + "motors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: newMotor.name,
          color: newMotor.color,
          cc: newMotor.cc,
          brand: newMotor.brand,
          status: newMotor.status,
          is_refresh: newMotor.status === "ready" ? true : false,
          price_oneday: newMotor.price_oneday,
          price_oneweek: newMotor.price_oneweek,
          price_onemonth: newMotor.price_onemonth,
        },
      });
      props.setRefreshData(Math.random());
      history.push("/admin/motor");
    } catch (e) {
      console.log("Fail to POST Motor" + e);
    }
  };

  const handleOnChange = (ev) => {
    setNewMotor((state) => ({ ...state, [ev.target.name]: ev.target.value }));
  };

  return (
    <div className="fade-in">
      <h1>
        Add A Motor:
        {/* {id} */}
      </h1>
      <div className="SpecificMotor-form">
        <div className="SpecificMotor-form-container">
          <div className="SpecificMotor-form-container-col">
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Brand: </label>
              <select
                className="SpecificMotor-input"
                name="brand"
                onChange={(ev) => handleOnChange(ev)}
              >
                <option value={0}>Choose Brand</option>
                <option value="Honda">Honda</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Suzuki">Suziki</option>
              </select>
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Name: </label>
              <select
                className="SpecificMotor-input"
                name="name"
                onChange={(ev) => handleOnChange(ev)}
              >
                <option value={0}>Choose Motor</option>
                <option value="City">City</option>
                <option value="Dream">Dream</option>
              </select>
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Color: </label>
              <select
                className="SpecificMotor-input"
                name="color"
                onChange={(ev) => handleOnChange(ev)}
              >
                <option value={0}>Choose Color</option>
                <option value="red-white">Red - White</option>
                <option value="black-white">Black - White</option>
              </select>
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Cc: </label>
              <input
                className="SpecificMotor-input"
                name="cc"
                type="number"
                onChange={(ev) => handleOnChange(ev)}
                // onChange={(e) => handleOnChange(e)}
                // defaultValue={motor.cc}
              />
            </div>
          </div>
          <div className="SpecificMotor-form-container-col">
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Price One Day: </label>
              <input
                className="SpecificMotor-input"
                name="price_oneday"
                type="number"
                onChange={(ev) => handleOnChange(ev)}
                // defaultValue={motor.price_oneday}
              />
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Price One Week: </label>
              <input
                className="SpecificMotor-input"
                name="price_oneweek"
                type="number"
                onChange={(ev) => handleOnChange(ev)}
                // defaultValue={motor.price_oneweek}
              />
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Price One Month: </label>
              <input
                className="SpecificMotor-input"
                name="price_onemonth"
                type="number"
                onChange={(ev) => handleOnChange(ev)}
                // defaultValue={motor.price_onemonth}
              />
            </div>
            <div className="SpecificMotor-form-container-col-div">
              {" "}
              <label className="SpecificMotor-label">Status: </label>
              <select
                className="SpecificMotor-input"
                name="status"
                onChange={(ev) => handleOnChange(ev)}
              >
                <option value={0}>Choose Status</option>
                <option value="ready">Ready</option>
                <option value="maintance">Maintance</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="SpecificMotor-action">
        <Link to="/admin/motor">
          <button className="btn">Cancel</button>
        </Link>
        <button className="btn btn-green" onClick={() => postData()}>
          Add
        </button>
      </div>
    </div>
  );
}

export default NewMotor;
