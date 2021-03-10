import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./SpecificMotor.scss";
import PropTypes from "prop-types";

const axios = require("axios").default;
const url = "http://localhost:5000/";

function SpecificMotor(props) {
  const [motor, setMotor] = useState({});
  const [payment, setPayment] = useState([]);
  const [motorUpdated, setMotorUpdated] = useState({});
  const { slug, id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getMotorAsync() {
      try {
        const response = await axios(url + "motors/" + id);
        const responseJSON = await response.data;
        setMotor(responseJSON);
        setMotorUpdated(responseJSON);
      } catch (err) {
        console.log(`Fail to axios User: ${err}`);
      }
    }
    getMotorAsync();
  }, []);

  useEffect(() => {
    let thisPayments = props.payments.filter((value) => value.motor_id === id);
    thisPayments.reverse();
    setPayment(thisPayments);
  }, [props.payments]);

  const handleTotalRevenue = () => {
    let res = payment.reduce((acc, value) => acc + value.price, 0);
    return res;
  };

  const handleOnChange = (e) => {
    setMotorUpdated((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const updateMotor = async (id) => {
    try {
      let result = await axios({
        method: "PATCH",
        url: url + "motors/update",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          motorId: id,
          name: motorUpdated.name,
          cc: motorUpdated.cc,
          price_oneday: motorUpdated.price_oneday,
          price_oneweek: motorUpdated.price_oneweek,
          price_onemonth: motorUpdated.price_onemonth,
          status: motorUpdated.status,
          is_refresh: true,
        },
      });
      result = await result.data;
      history.push("/admin/motor");
      props.setRefreshData(Math.random());
    } catch (err) {
      console.log("Fail to update Motor" + err);
    }
  };

  return (
    <>
      <h1>Specific Motor: {id}</h1>
      <div className="SpecificMotor-form">
        <div className="SpecificMotor-form-container">
          <div className="SpecificMotor-form-container-col">
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Name: </label>
              <input
                className="SpecificMotor-input"
                defaultValue={motor.name}
                name="name"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Cc: </label>
              <input
                className="SpecificMotor-input"
                name="cc"
                type="number"
                onChange={(e) => handleOnChange(e)}
                defaultValue={motor.cc}
              />
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Price One Day: </label>
              <input
                className="SpecificMotor-input"
                name="price_oneday"
                type="number"
                onChange={(e) => handleOnChange(e)}
                defaultValue={motor.price_oneday}
              />
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Price One Week: </label>
              <input
                className="SpecificMotor-input"
                name="price_oneweek"
                type="number"
                onChange={(e) => handleOnChange(e)}
                defaultValue={motor.price_oneweek}
              />
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Price One Month: </label>
              <input
                className="SpecificMotor-input"
                name="price_onemonth"
                type="number"
                onChange={(e) => handleOnChange(e)}
                defaultValue={motor.price_onemonth}
              />
            </div>
          </div>
          <div className="SpecificMotor-form-container-col">
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Total Rental: </label>
              <div className="SpecificMotor-input">{payment.length}</div>
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Total Revenue: </label>
              <div className="SpecificMotor-input">
                {props.formatCash(`${handleTotalRevenue()}`)}đ
              </div>
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Date Create: </label>
              <div className="SpecificMotor-input">
                {motor.create_at ? props.renderTime(motor.create_at) : ""}
              </div>
            </div>
            <div className="SpecificMotor-form-container-col-div">
              <label className="SpecificMotor-label">Last Rented At: </label>
              <div className="SpecificMotor-input">
                {payment[0]?.start ? props.renderTime(payment[0].start) : ""}
              </div>
            </div>
            <div className="SpecificMotor-form-container-col-div">
              {" "}
              <label className="SpecificMotor-label">Status: </label>
              <select
                value={motorUpdated.status}
                className="SpecificMotor-input"
                name="status"
                onChange={(e) => handleOnChange(e)}
              >
                <option value="ready">READY</option>
                <option value="maintance">MAINTANCE</option>
                <option value="renting">RENTING</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="SpecificMotor-action">
        <Link to="/admin/motor">
          <button className="btn">Cancel</button>
        </Link>
        <button className="btn btn-green" onClick={() => updateMotor(id)}>
          Update
        </button>
      </div>
      <div className="SpecificMotor-history-div">
        <div className="HistoryRentPay-container">
          <h2>History Rental</h2>
          <table style={{ width: "100%" }} className="HistoryRental-table">
            <tbody>
              <tr>
                <th>Qty</th>
                <th>Time</th>
                <th>Price</th>
                <th>Duration</th>
                <th>By User</th>
              </tr>
              {payment.map((value, index) => (
                <tr key={value._id}>
                  <td>{index + 1}</td>
                  <td>{props.renderTime(value.start)}</td>
                  <td className="text-right">
                    {props.formatCash(`${value.price}`)}đ
                  </td>
                  <td className="text-right">
                    {props.innerTime(value.duration)}
                  </td>
                  <td>{props.handleUserEmail(value.user_id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

SpecificMotor.propTypes = {
  formatCash: PropTypes.func,
  handleUserEmail: PropTypes.func,
  innerTime: PropTypes.func,
  payments: PropTypes.array,
  renderTime: PropTypes.func,
  setRefreshData: PropTypes.func,
};

export default SpecificMotor;
