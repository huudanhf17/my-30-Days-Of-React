import React, { useEffect, useState } from "react";
import "./RefreshMotor.css";

function RefreshMotor(props) {
  const [refresheMotorList, setRefreshMotorList] = useState([]);

  useEffect(() => {
    setRefreshMotorList(props.motorListMaintance);
  }, [props.motorListMaintance]);

  const innerTime = (time) => {
    return `${time.getDate()}/${
      time.getMonth() + 1
    }/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };

  const refreshMotor = async (id, index) => {
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
      result2 = await result2.json();
      refresheMotorList.splice(index, 1);
      const temp = [...refresheMotorList];
      setRefreshMotorList(temp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Refresh Motor</h1>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>Qty</th>
            <th>Time Expiration</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          {refresheMotorList
            .sort((a, b) => a.left - b.left)
            .map((value, index) => {
              return (
                <tr key={value.motor_id}>
                  <td>{index + 1}</td>
                  <td>{innerTime(value.expiration_time)}</td>
                  <td>{`${value.brand} ${value.name} ${value.cc} ${value.color}`}</td>
                  <td>
                    <button onClick={() => refreshMotor(value.motor_id, index)}>
                      Refresh
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default RefreshMotor;
