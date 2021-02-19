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
    motor.status = checki(durationRent, motor._id);
  };

  const test = () => {
    const date = new Date(2021, 1, 19, 13, 45, 50);
    date.setSeconds(date.getSeconds() + 3600);
    let dateNow = new Date(Date.now());
    let dateLeft = Math.abs(date.getTime() - dateNow.getTime());
    console.log(
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
      ${Math.floor(dateLeft / 1000)}`
    );
    let abc = Math.floor(dateLeft / 1000);
    checki(abc, "abc");
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
              <span className={`Main-span`} id={motor._id}>
                {motor.status}
              </span>
            </div>
            <button className="Main-btn" onClick={() => rent(motor)}>
              RENT
            </button>
          </li>
        ))}
        <li className="Main-li">
          {imgMotor("Dream")}
          <div className="Main-div-ul-div">
            <select className="Main-select" onChange={(ev) => onChangeSort(ev)}>
              <option value={0}>Duration</option>
              <option value={50000}>1 day / {formatCash(`${50000}`)}đ</option>
              <option value={100000}>
                1 week / {formatCash(`${100000}`)}đ
              </option>
              <option value={700000}>
                1 month / {formatCash(`${700000}`)}đ
              </option>
            </select>
            <span className={`Main-span`} id="abc">
              ABC
            </span>
          </div>
          <button className="Main-btn" onClick={() => test()}>
            RENT
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Main;
