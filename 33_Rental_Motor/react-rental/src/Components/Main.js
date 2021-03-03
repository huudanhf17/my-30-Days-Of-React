import React, { useState } from "react";
import "./Main.css";
import MotorStatus from "./MotorStatus";
import RentModal from "./RentModal";
import useModal from "./useModal";

function Main(props) {
  const [dataRent, setDataRent] = useState(0);
  const [durationRent, setDurationRent] = useState(0);
  const [dataModal, setDataModal] = useState({});
  const [indexMotor, setIndexMotor] = useState();
  const { isShowing, toggle } = useModal();

  const imgMotor = (name) => {
    if (name === "Dream") {
      return <img src="../img/dream.jpg" className="Main-img img__img" />;
    } else {
      return <img src="../img/city.jpg" className="Main-img img__img" />;
    }
  };

  const rent = (motor, index) => {
    props.getRentInfo(motor.motor_id, dataRent, durationRent, index);
    //motor.status = checki(durationRent, motor.motor_id);
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
    const price = ev.target.parentNode.children[1].children[0].value;
    if (price === "0") {
      console.log("You have not chosen rent duration!");
    } else {
      const duration =
        ev.target.parentNode.children[1].children[0].selectedOptions[0].text;
      setDataRent(price);
      setIndexMotor(index);
      if (duration.includes("day")) {
        setDurationRent(5);
      } else if (duration.includes("week")) {
        setDurationRent(604800);
      } else {
        setDurationRent(2592000);
      }
      setDataModal(data);
      toggle();
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
              <span className={`Main-span`} id={motor.motor_id}>
                <MotorStatus
                  status={motor}
                  initialDays={() => props.splitTime(motor.left, "days")}
                  initialHours={() => props.splitTime(motor.left, "hours")}
                  initialMinutes={() => props.splitTime(motor.left, "minutes")}
                  initialSeconds={() => props.splitTime(motor.left, "seconds")}
                ></MotorStatus>
              </span>
            </div>
            <button className="Main-btn" onClick={() => rent(motor, index)}>
              RENT
            </button>
            <button onClick={(ev) => rentClick(motor, index, ev)}>
              Testing
            </button>
          </li>
        ))}
      </ul>
      <RentModal
        isShowing={isShowing}
        hide={toggle}
        // removeClick={(uuidRemove) => removeClick(uuidRemove)}
        // brand={motor.brand}
        // name={motor.name}
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
    </div>
  );
}

export default Main;
