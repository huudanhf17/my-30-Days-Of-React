import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MotorStatus from "./MotorStatus";
import SpecificModal from "./SpecificModal";
import useModal from "./useModal";

import "./User.css";

function User(props) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(props.userList);
  }, [props.userList]);

  const { isShowing, toggle } = useModal();

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

  const banUser = async (id) => {
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
      result = await result.json();
      // refresheMotorList.splice(index, 1);
      // const temp = [...refresheMotorList];
      // setRefreshMotorList(temp);
    } catch (err) {
      console.log("Fail to ban User " + err);
    }
  };

  const activeUser = async (id) => {
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

  return (
    <>
      <h1>User</h1>
      <ul className="User-submenu">
        <li className="User-ul-li clickable" onClick={() => filterUserList("")}>
          All ({countFilterUserList("")})
        </li>
        <li
          className="User-ul-li clickable"
          onClick={() => filterUserList("unactive")}
        >
          Unactive({countFilterUserList("unactive")})
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
            <th>Description</th>
            <th>Balance</th>
            <th>Currently Rent</th>
            <th>Action</th>
          </tr>
          {userList.map((value, index) => (
            <tr key={value.email}>
              <td>{index + 1}</td>
              <td>{value.email}</td>
              <td>{value.type}</td>
              <td>
                Already top up{" "}
                {props.formatCash(`${filterTopUpUser(value._id, topUpList)}`)}đ
                | spent{" "}
                {props.formatCash(`${filterOrderUser(value._id, orderList)}`)}đ
                for {countOrderUser(value._id, orderList)} rents
              </td>
              <td className="text-right">
                {props.formatCash(`${filterTransUser(value._id, transList)}`)}đ
              </td>
              <td>
                {motorBeingRentedList.map((motor) => {
                  if (motor.user_id === value._id) {
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
                  } else {
                    return `.`;
                  }
                })}
              </td>
              <td>
                <Link to={`/admin/user/${value.email}.${value._id}`}>
                  <button
                  // onClick={() => specificClick(value)}
                  // userId={value._id}
                  >
                    Specific
                  </button>
                </Link>
                <button onClick={() => banUser(value._id)}>Ban</button>
                <button onClick={() => activeUser(value._id)}>Active</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SpecificModal
        isShowing={isShowing}
        hide={toggle}
        // removeClick={(uuidRemove) => removeClick(uuidRemove)}
      />
    </>
  );
}

export default User;
