import React, { useEffect, useState } from "react";
import "./HistoryRentPay.css";

function HistoryRentPay(props) {
  const [motorList, setMotorList] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setMotorList(props.motorList);
  }, [props.motorList]);

  useEffect(() => {
    const newCoins = props.coins.map((value) => {
      return {
        _id: value._id,
        user_id: value.user_id,
        created_at: changeTimeZone2(value.created_at),
        plus: value.plus,
      };
    });
    setCoinList(newCoins);
  }, [props.coins]);

  useEffect(() => {
    const newPayment = props.payments.map((value) => {
      return {
        _id: value._id,
        user_id: value.user_id,
        created_at: changeTimeZone2(value.start),
        price: value.price,
        motor_id: value.motor_id,
        duration: value.duration,
      };
    });
    setPayments(newPayment);
  }, [props.payments]);

  const changeTimeZone2 = (utc) => {
    let d = new Date(
      utc.substr(0, 4),
      utc.substr(5, 2) - 1,
      utc.substr(8, 2),
      utc.substr(11, 2),
      utc.substr(14, 2),
      utc.substr(17, 2)
    );
    d.setHours(d.getHours() + 7);
    return d;
  };

  const summary = coinList.concat(payments);
  const userSummary = summary.filter((value) => value.user_id === props.user);
  userSummary.sort((a, b) => a.created_at - b.created_at);
  const userSummaryClone = [...userSummary];
  userSummary.sort((a, b) => b.created_at - a.created_at);

  const renderTime = (d) => {
    return `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  };

  const getCoins = () => {
    let coins = 0;
    let test = userSummaryClone.map((value) => {
      value.price ? (coins -= value.price) : (coins += value.plus);
      return coins;
    });
    return test;
  };

  const getMotorName = (id) => {
    let res = motorList.filter((value) => id.includes(value.motor_id));
    return `${res[0].brand} ${res[0].name}`;
  };

  if (motorList.length > 0 && coinList.length > 0 && payments.length > 0) {
    return (
      <div className="HistoryRentPay-div">
        <div className="HistoryRentPay-container">
          <h1>History of Rent - Payment </h1>
          <table style={{ width: "100%" }} className="HistoryRentPay-table">
            <tbody>
              <tr>
                <th>Qty</th>
                <th>Time</th>
                <th>+ / -</th>
                <th>Balance</th>
                <th>Description</th>
              </tr>
              {userSummary.map((value, index) => {
                return (
                  <tr key={value._id}>
                    <td>{index + 1}</td>
                    <td>
                      {value.start
                        ? renderTime(value.start)
                        : renderTime(value.created_at)}
                    </td>

                    {value.price ? (
                      <td className="text-right text-danger">
                        -{props.formatCash(`${value.price}`)}đ
                      </td>
                    ) : (
                      <td className="text-right text-green">
                        +{props.formatCash(`${value.plus}`)}đ
                      </td>
                    )}

                    <td className="text-right">{`${props.formatCash(
                      `${getCoins()[userSummary.length - 1 - index]}`
                    )}đ`}</td>
                    <td>
                      {value.price
                        ? `Rent ${getMotorName(
                            value.motor_id
                          )} for ${props.innerTime(value.duration)}`
                        : "Top up"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="HistoryRentPay-div2">.....</div>
      </div>
    );
  } else {
    return null;
  }
}

export default HistoryRentPay;
