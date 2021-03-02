import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Motor.css";
import MotorStatus from "./MotorStatus";

function Motor(props) {
  const [motorList, setMotorList] = useState([]);

  useEffect(() => {
    setMotorList(props.motorList);
  }, [props.motorList]);

  const handleTotalRr = (motorId, tag) => {
    const res = props.payments.reduce((acc, value) => {
      if (value.motor_id === motorId) {
        switch (tag) {
          case "rental":
            return acc + 1;
            break;
          case "revenue":
            return acc + value.price;
            break;
        }
      } else {
        return acc + 0;
      }
    }, 0);
    return res;
  };

  const handleCountDown = (str) => {
    if (str.props.status.left) {
      return str;
    } else {
      return "";
    }
  };

  const filterMotorList = (status) => {
    let res = props.motorList.filter((value) => value.status.includes(status));
    setMotorList(res);
  };

  const countFilterMotorList = (status) => {
    let res = props.motorList.reduce((acc, value) => {
      if (value.status.includes(status)) {
        return acc + 1;
      } else {
        return acc + 0;
      }
    }, 0);
    return res;
  };

  return (
    <>
      <h1>Motor</h1>
      <ul className="User-submenu">
        <li
          className="User-ul-li clickable"
          onClick={() => filterMotorList("")}
        >
          All ({countFilterMotorList("")})
        </li>
        <li
          className="User-ul-li clickable"
          onClick={() => filterMotorList("READY")}
        >
          Ready({countFilterMotorList("READY")})
        </li>
        <li
          className="User-ul-li clickable"
          onClick={() => filterMotorList("MAINTANCE")}
        >
          Maintance({countFilterMotorList("MAINTANCE")})
        </li>
        <li
          className="User-ul-li clickable"
          onClick={() => filterMotorList("RENTING")}
        >
          Renting({countFilterMotorList("RENTING")})
        </li>
      </ul>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>Qty</th>
            <th>Date Create</th>
            <th>Name</th>
            <th>License Plates</th>
            <th>Status</th>
            <th>Total Rental</th>
            <th>Total Revenue</th>
            <th>Currently Rent</th>
            <th>Action</th>
          </tr>
          {motorList.map((value, index) => (
            <tr key={value.motor_id}>
              <td>{index + 1}</td>
              <td>{props.renderTime(value.create_at)}</td>
              <td>
                {value.brand} {value.name}
              </td>
              <td>...</td>
              <td>{value.status}</td>
              <td className="text-right">
                {handleTotalRr(value.motor_id, "rental")}
              </td>
              <td className="text-right">
                {props.formatCash(
                  `${handleTotalRr(value.motor_id, "revenue")}`
                )}
                đ
              </td>
              <td>
                {value.left
                  ? props.handleUserEmail(value.user_id) + " for "
                  : "None"}
                {handleCountDown(
                  <MotorStatus
                    status={value}
                    initialDays={() => props.splitTime(value.left, "days")}
                    initialHours={() => props.splitTime(value.left, "hours")}
                    initialMinutes={() =>
                      props.splitTime(value.left, "minutes")
                    }
                    initialSeconds={() =>
                      props.splitTime(value.left, "seconds")
                    }
                  ></MotorStatus>
                )}
              </td>
              <td>
                <Link to={`/admin/motor/id.${value.motor_id}`}>
                  <button>More Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Motor;
