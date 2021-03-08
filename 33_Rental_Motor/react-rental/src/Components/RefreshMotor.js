import React, { useEffect, useState } from "react";
import "./RefreshMotor.css";

function RefreshMotor(props) {
  const [refresheMotorList, setRefreshMotorList] = useState([]);

  useEffect(() => {
    setRefreshMotorList(props.motorListMaintance);
  }, [props.motorListMaintance]);

  useEffect(() => {
    // do {
    //   console.log("ko chay");
    // } while (props.motorListMaintance.length === 0);
    // if (props.motorListMaintance.length === 0) {
    //    var refresh = setInterval(() => {
    //     console.log("chay interval");
    //     props.setRefreshData(Math.random());
    //   }, 8000);
    // } else if (props.motorListMaintance.length >= 0) {
    //   clearInterval(refresh);
    //   console.log("clear Interval");
    // }
  }, [props.motorListMaintance]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     props.setRefreshData(Math.random());
  //   }, props.reNewRefreshMotor * 1000);
  // }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(props.motorListMaintance);
  //     if (props.motorListMaintance.length === 0) {
  //       console.log("kich hoat interval");
  //       setInterval(() => {
  //         props.setRefreshData(Math.random());
  //       }, 8000);
  //     }
  //   }, 8000);
  // }, []);

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
      // refresheMotorList.splice(index, 1);
      // const temp = [...refresheMotorList];
      // setRefreshMotorList(temp);
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
          {refresheMotorList
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
                      onClick={() => refreshMotor(value.motor_id, index)}
                    >
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
