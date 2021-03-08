import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MotorStatus from "./MotorStatus";
import SpecificModal from "./SpecificModal";
import useModal from "./useModal";

import "./User.css";

function User(props) {
  const [userList, setUserList] = useState([]);
  const [isActive, setIsActive] = useState();
  const [isShowing, toggle] = useModal();

  useEffect(() => {
    setUserList(props.userList);
  }, [props.userList]);

  const topUpList = props.coins.reduce(
    (acc, value) => acc.concat({ plus: value.plus, user_id: value.user_id }),
    []
  );

  const orderList = props.payments.reduce(
    (acc, value) => acc.concat({ price: value.price, user_id: value.user_id }),
    []
  );

  const transList = topUpList.concat(orderList);

  const motorBeingRentedList = props.motorList.filter((value) => value.user_id);

  let orderId = "";

  const filterTopUpUser = (user_id, topUpList) => {
    const res = topUpList.reduce((acc, value) => {
      if (value.user_id === user_id && value.plus) {
        return acc + value.plus;
      } else {
        return acc + 0;
      }
    }, 0);
    return res;
  };

  const filterOrderUser = (user_id, orderList) => {
    const res = orderList.reduce((acc, value) => {
      if (value.user_id === user_id && value.price) {
        return acc + value.price;
      } else {
        return acc + 0;
      }
    }, 0);
    return res;
  };

  const filterTransUser = (user_id, transList) => {
    const res = transList.reduce((acc, value) => {
      if (value.user_id === user_id) {
        if (value.price) {
          return acc - value.price;
        } else {
          return acc + value.plus;
        }
      } else {
        return acc + 0;
      }
    }, 0);
    return res;
  };

  const countOrderUser = (user_id, orderList) => {
    const res = orderList.reduce((acc, value) => {
      if (value.user_id === user_id && value.price) {
        return acc + 1;
      } else {
        return acc + 0;
      }
    }, 0);
    return res;
  };

  const banUser = async (id, index, orderId) => {
    try {
      let result = await fetch(`http://localhost:5000/users/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          type: "banned",
        }),
      });

      let result2 = await fetch(`http://localhost:5000/orders/ban`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: userList[index].orderId,
        }),
      });

      setIsActive(false);
      toggle();
      userList[index].type = "banned";

      props.setRefreshData(Math.random());
      props.setRefreshUserList(Math.random());
    } catch (err) {
      console.log("Fail to ban User " + err);
    }
  };

  const activeUser = async (id, index, ev) => {
    try {
      let result = await fetch(`http://localhost:5000/users/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          type: "active",
        }),
      });
      result = await result.json();
      setIsActive(true);
      toggle();
      userList[index].type = "active";

      // ev.target.parentElement.parentElement.focus();
    } catch (err) {
      console.log("Fail to active User " + err);
    }
  };

  const filterUserList = (type) => {
    let res = props.userList.filter((value) => value.type.includes(type));
    setUserList(res);
  };

  const countFilterUserList = (type) => {
    let res = props.userList.reduce((acc, value) => {
      if (value.type.includes(type)) {
        return acc + 1;
      } else {
        return acc + 0;
      }
    }, 0);
    return res;
  };

  const handleClassType = (type) => {
    switch (type) {
      case "active":
        return <td className="text-green">{type}</td>;
        break;
      case "banned":
        return <td className="text-danger">{type}</td>;
        break;
      case "unactive":
        return (
          <td>
            <b>{type}</b>
          </td>
        );
        break;
      case "admin":
        return (
          <td className="text-green">
            <b>{type}</b>
          </td>
        );
        break;
    }
  };

  return (
    <>
      <h1 className="User-h1">User</h1>
      <ul className="User-submenu">
        <li className="User-ul-li clickable" onClick={() => filterUserList("")}>
          All ({countFilterUserList("")})
        </li>
        <li
          className="User-ul-li clickable"
          onClick={() => filterUserList("unactive")}
        >
          Unactive(<b>{countFilterUserList("unactive")}</b>)
        </li>
        <li
          className="User-ul-li clickable"
          onClick={() => filterUserList("active")}
        >
          Active({countFilterUserList("active")})
        </li>
        <li
          className="User-ul-li clickable"
          onClick={() => filterUserList("banned")}
        >
          Banned({countFilterUserList("banned")})
        </li>
      </ul>

      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>Qty</th>
            <th>Email</th>
            <th>Type</th>
            <th>Payments</th>
            <th>Balance</th>
            <th>Rents</th>
            <th>Counts</th>
            <th>Currently Rent</th>
            <th>Action</th>
          </tr>
          {userList.map((value, index) => (
            <tr key={value.email}>
              <td>{index + 1}</td>
              <td>{value.email}</td>
              {handleClassType(value.type)}
              <td className="text-right">
                {props.formatCash(`${filterTopUpUser(value._id, topUpList)}`)}đ
              </td>
              <td className="text-right">
                {props.formatCash(`${filterTransUser(value._id, transList)}`)}đ
              </td>
              <td className="text-right">
                {props.formatCash(`${filterOrderUser(value._id, orderList)}`)}đ
              </td>
              <td className="text-right">
                {countOrderUser(value._id, orderList)}
              </td>
              <td>
                {motorBeingRentedList.map((motor) => {
                  if (motor.user_id === value._id) {
                    userList[index].orderId = motor.order_id;
                    return (
                      <p className="User-currently-rent" key={motor.motor_id}>
                        {motor.brand} {motor.name} for{" "}
                        <MotorStatus
                          status={motor}
                          initialDays={() =>
                            props.splitTime(motor.left, "days")
                          }
                          initialHours={() =>
                            props.splitTime(motor.left, "hours")
                          }
                          initialMinutes={() =>
                            props.splitTime(motor.left, "minutes")
                          }
                          initialSeconds={() =>
                            props.splitTime(motor.left, "seconds")
                          }
                        ></MotorStatus>
                      </p>
                    );
                  }
                })}
              </td>
              <td className="text-center">
                <Link to={`/admin/user/${value.email}.${value._id}`}>
                  <button className="btn-new bg-info User-spe">Specific</button>
                </Link>
                <button
                  className="btn-new btn-danger User-ban"
                  onClick={() => banUser(value._id, index)}
                >
                  Ban
                </button>
                <button
                  className="btn-new bg-green User-act"
                  onClick={(ev) => activeUser(value._id, index, value.orderId)}
                >
                  Active
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SpecificModal
        isShowing={isShowing}
        hide={toggle}
        isActive={isActive}
        // removeClick={(uuidRemove) => removeClick(uuidRemove)}
      />
    </>
  );
}

export default User;
