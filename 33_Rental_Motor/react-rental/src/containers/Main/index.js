import React, { useState } from "react";
import OopsModal from "../../components/Modal/OopsModal";
import RentModal from "../../components/Modal/RentModal";
import MotorStatus from "../../components/MotorStatus";
import useModal from "../../utils/useModal";
import "./Main.scss";

function Main(props) {
  const [dataRent, setDataRent] = useState(0);
  const [durationRent, setDurationRent] = useState(0);
  const [dataModal, setDataModal] = useState({});
  const [indexMotor, setIndexMotor] = useState();
  const [isOops, setIsOops] = useState();
  const [isShowing, toggle] = useModal();
  const [isShowing2, toggle2] = useModal();

  const imgMotor = (name) => {
    if (name === "Dream") {
      return <img src="../img/dream.jpg" className="Main-img img__img" />;
    } else {
      return <img src="../img/city.jpg" className="Main-img img__img" />;
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

  const rentClick = (data, index, ev) => {
    const price = ev.target.parentNode.children[1].children[0];
    if (price.value === "0") {
      setIsOops(price);
      toggle2();
      // ev.target.parentNode.children[1].children[0].focus();
    } else if (props.coin < Number(price.value)) {
      setIsOops(false);
      toggle2();
    } else if (props.coin >= Number(price.value)) {
      const textDuration =
        ev.target.parentNode.children[1].children[0].selectedOptions[0].text;
      setDataRent(price.value);
      setIndexMotor(index);
      if (textDuration.includes("day")) {
        var duration = 5;
        setDurationRent(5);
      } else if (textDuration.includes("week")) {
        var duration = 604800;
        setDurationRent(604800);
      } else {
        var duration = 2592000;
        setDurationRent(2592000);
      }
      props.getRentInfo(data.motor_id, price.value, duration, index);
      setDataModal(data);
      toggle();
    }
  };

  const classNameStatus = (sort) => {
    switch (sort) {
      case 0:
        return "Main-span text-green";
        break;
      case 1:
        return "Main-span text-green";
        break;
      case 2:
        return "Main-span text-yellow";
        break;
      case 3:
        return "Main-span text-danger";
        break;
    }
  };

  return (
    <div className="Main-div">
      <ul className="Main-ul">
        {props.motorList.map((motor, index) => (
          <li key={motor.motor_id + motor.left} className="Main-li">
            <div className="img__wrap">
              {imgMotor(motor.name)}
              <p className="img__description">{motor.cc}cc - abcxyz...</p>
            </div>
            <div className="Main-div-ul-div">
              <select className="Main-select">
                <option value={0}>Duration</option>
                <option value={motor.price_oneday}>
                  1 day / {props.formatCash(`${motor.price_oneday}`)}đ
                </option>
                <option value={motor.price_oneweek}>
                  1 week / {props.formatCash(`${motor.price_oneweek}`)}đ
                </option>
                <option value={motor.price_onemonth}>
                  1 month / {props.formatCash(`${motor.price_onemonth}`)}đ
                </option>
              </select>
              <span className={classNameStatus(motor.sort)} id={motor.motor_id}>
                <MotorStatus
                  status={motor}
                  initialDays={() => props.splitTime(motor.left, "days")}
                  initialHours={() => props.splitTime(motor.left, "hours")}
                  initialMinutes={() => props.splitTime(motor.left, "minutes")}
                  initialSeconds={() => props.splitTime(motor.left, "seconds")}
                ></MotorStatus>
              </span>
            </div>
            {(motor.sort === 0) | (motor.sort === 1) ? (
              <button
                className="Main-btn btn-new bg-green"
                onClick={(ev) => rentClick(motor, index, ev)}
              >
                RENT
              </button>
            ) : (
              <button className="Main-btn btn-new bg-green-disable no-hover">
                RENTING
              </button>
            )}
          </li>
        ))}
      </ul>
      <RentModal
        isShowing={isShowing}
        hide={toggle}
        motor={dataModal}
        imgMotor={(data) => imgMotor(data)}
        dataRent={dataRent}
        durationRent={durationRent}
        formatCash={(str) => props.formatCash(str)}
        innerTime={(sec) => props.innerTime(sec)}
        indexMotor={indexMotor}
        getRentInfo={(motor, price, durationRent, index) =>
          props.getRentInfo(motor, price, durationRent, index)
        }
      />
      <OopsModal
        isShowing={isShowing2}
        hide={toggle2}
        isOops={isOops}
      ></OopsModal>
    </div>
  );
}

export default Main;
