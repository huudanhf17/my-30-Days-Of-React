import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalMotorBan from "./ModalMotorBan";
import "./Motor.scss";
import MotorStatus from "./MotorStatus";
import useModal from "./useModal";

function Motor(props) {
  const [motorList, setMotorList] = useState([]);
  const [dataModalMotorBan, setDataModalMotorBan] = useState({});
  const [isShowing, toggle] = useModal();

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

  const handleBan = (value, email) => {
    dataModalMotorBan.email = email;
    dataModalMotorBan.motor = `${value.brand} ${value.name}`;
    dataModalMotorBan.value = value;
    toggle();
  };

  return (
    <>
      <h1 className="fade-in">Motor</h1>
      <ul className="Motor-submenu fade-in">
        <div></div>
        <div className="Motor-submenu-div">
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
        </div>
        <div>
          <Link to={`/admin/motor/add`} className="btn-new bg-green Motor-add">
            +
          </Link>
        </div>
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
              <td className="text-center">
                <Link
                  to={`/admin/motor/id.${value.motor_id}`}
                  className="margin-right-6"
                >
                  <button className="btn-new bg-info">More Details</button>
                </Link>
                <button
                  className="btn-new bg-dg margin-left-6"
                  onClick={() =>
                    handleBan(value, props.handleUserEmail(value.user_id))
                  }
                >
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalMotorBan
        isShowing={isShowing}
        hide={toggle}
        dataModalMotorBan={dataModalMotorBan}
        setRefreshData={(num) => props.setRefreshData(num)}
        setRefreshUserList={(num) => props.setRefreshUserList(num)}
      ></ModalMotorBan>
    </>
  );
}

export default Motor;
