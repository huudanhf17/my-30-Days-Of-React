import React, { useEffect, useState } from "react";

function MotorStatus(props) {
  const {
    initialDays = 1,
    initialHours = 0,
    initialMinutes = 0,
    initialSeconds = 1,
  } = props;

  const [days, setDays] = useState(initialDays);
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            if (days === 0) {
              clearInterval(myInterval);
            } else {
              setDays(days - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const checkIsCd = (left) => {
    if (left) {
      return (
        <div>
          {days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? (
            "MAINTANCE"
          ) : (
            <div>
              {days}:{hours}:{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          )}
        </div>
      );
    } else {
      return "READY";
    }
  };

  return checkIsCd(props.status.left);
}

export default MotorStatus;
