import React, { useState } from "react";
import "./Main.css";

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

  const rent = (motor) => {
    props.getRentInfo(motor._id, dataRent);

    motor.status = durationRent;
  };

  const onChangeSort = (ev) => {
    setDataRent(ev.target.value);
    const text = ev.target.selectedOptions[0].text;
    if (text.includes("day")) {
      setDurationRent(86400);
    } else if (text.includes("week")) {
      setDurationRent(604800);
    } else {
      setDurationRent(2628000);
    }
  };

  return (
    <div className="Main-div">
      <ul className="Main-ul">
        {props.motorList.map((motor) => (
          <li key={motor._id} className="Main-li">
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
              <span className="Main-span">{motor.status}</span>
            </div>
            <button className="Main-btn" onClick={() => rent(motor)}>
              RENT
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
