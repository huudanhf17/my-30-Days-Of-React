import React, { useEffect, useState } from "react";
import "./RefreshMotor.css";

function RefreshMotor(props) {
  useEffect(() => {
    if (props.motorListMaintance.length === 0) {
      const refresh = setInterval(() => {
        console.log("chay interval");

        props.setRefreshData(Math.random());
        console.log("clear Interval");
        clearInterval(refresh);
      }, 5000);
    }
  }, [props.motorListMaintance]);

  const innerTime = (time) => {
    const year = time.getFullYear();
    const month = `0${time.getMonth() + 1}`;
    const day = `0${time.getDate()}`;
    const hours = "0" + time.getHours();
    const minutes = "0" + time.getMinutes();
    return `${hours.substr(-2)}:${minutes.substr(-2)} ${day.substr(
      -2
    )}/${month.substr(-2)}/${year}`;
  };

  const refreshMotor = async (id, orderId) => {
    try {
      let result2 = await fetch(`http://localhost:5000/motors/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_refresh: true,
          motorId: id,
        }),
      });

      if (orderId) {
        let result = await fetch(`http://localhost:5000/orders/after`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId,
          }),
        });
      }

      props.setRefreshData(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="fade-in">Refresh Motor</h1>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>Qty</th>
            <th>Time Expiration</th>
            <th>Name</th>
            <th>Action</th>
          </tr>

          {props.motorListMaintance.length > 0
            ? props.motorListMaintance
                .sort((a, b) => a.left - b.left)
                .map((value, index) => {
                  return (
                    <tr key={value.motor_id}>
                      <td>{index + 1}</td>
                      <td>{innerTime(value.expiration_time)}</td>
                      <td>{`${value.brand} ${value.name} ${value.cc} ${value.color}`}</td>
                      <td>
                        <button
                          className="btn-new bg-green"
                          onClick={() =>
                            refreshMotor(value.motor_id, value.order_id)
                          }
                        >
                          Refresh
                        </button>
                      </td>
                    </tr>
                  );
                })
            : null}
        </tbody>
      </table>
    </>
  );
}

export default RefreshMotor;
