import React, { useState } from "react";
import "./Main.css";
import MotorStatus from "./MotorStatus";

function Main(props) {
  const [dataRent, setDataRent] = useState(0);
  const [durationRent, setDurationRent] = useState(0);

  const formatCash = (str) => {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };

  const imgMotor = (name) => {
    if (name === "Dream") {
      return <img src="../img/dream.jpg" className="Main-img" />;
    } else {
      return <img src="../img/city.jpg" className="Main-img" />;
    }
  };

  const rent = (motor, index) => {
    props.getRentInfo(motor.motor_id, dataRent, durationRent, index);
    //motor.status = checki(durationRent, motor.motor_id);
  };

  const onChangeSort = (ev) => {
    setDataRent(ev.target.value);
    const text = ev.target.selectedOptions[0].text;
    if (text.includes("day")) {
      setDurationRent(5);
    } else if (text.includes("week")) {
      setDurationRent(604800);
    } else {
      setDurationRent(2592000);
    }
  };

  const checki = (i, id) => {
    let temp = i;
    let countDown = document.getElementById(id);
    let days = Math.floor(i / (3600 * 24));
    i -= days * 3600 * 24;
    let hours = Math.floor(i / 3600);
    i -= hours * 3600;
    let minutes = Math.floor(i / 60);
    i -= minutes * 60;
    let countDownTime = `${days}:${hours}:${minutes}:${i}`;
    i = temp;
    if (i == 0) {
      setTimeout(() => {
        countDown.innerText = "MAINTENANCE";
      }, 1000);
    } else if (i <= i) {
      const abc = () => {
        setTimeout(() => {
          countDown.innerText = countDownTime;
          i--;
          checki(i, id);
        }, 1000);
      };
      abc();
    }
  };

  const splitTime = (seconds, unit) => {
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    switch (unit) {
      case "days":
        return days;
        break;
      case "hours":
        return hours;
        break;
      case "minutes":
        return minutes;
        break;
      case "seconds":
        return seconds;
        break;
    }
  };

  const checkRenting = (motor) => {
    if (motor.status === "RENTING") {
      console.log(motor.left, motor.motor_id);
    }
  };

  return (
    <div className="Main-div">
      <ul className="Main-ul">
        {props.motorList.map((motor, index) => (
          <li key={motor.motor_id + motor.left} className="Main-li">
            {imgMotor(motor.name)}
            <div className="Main-div-ul-div">
              <select
                className="Main-select"
                onChange={(ev) => onChangeSort(ev)}
              >
                <option value={0}>Duration</option>
                <option value={motor.price_oneday}>
                  1 day / {formatCash(`${motor.price_oneday}`)}đ
                </option>
                <option value={motor.price_oneweek}>
                  1 week / {formatCash(`${motor.price_oneweek}`)}đ
                </option>
                <option value={motor.price_onemonth}>
                  1 month / {formatCash(`${motor.price_onemonth}`)}đ
                </option>
              </select>
              <span className={`Main-span`} id={motor.motor_id}>
                <MotorStatus
                  status={motor}
                  initialDays={() => splitTime(motor.left, "days")}
                  initialHours={() => splitTime(motor.left, "hours")}
                  initialMinutes={() => splitTime(motor.left, "minutes")}
                  initialSeconds={() => splitTime(motor.left, "seconds")}
                ></MotorStatus>
              </span>
            </div>
            <button className="Main-btn" onClick={() => rent(motor, index)}>
              RENT
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
