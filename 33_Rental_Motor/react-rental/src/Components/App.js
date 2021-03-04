import logo from "../logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import PreMain from "./PreMain";
import AfterHeader from "./AfterHeader";
import Main from "./Main";
import Footer from "./Footer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useEffect, useState } from "react";
import HistoryRentPay from "./HistoryRentPay";
import Admin from "./Admin";

function App() {
  const [motorList, setMotorList] = useState([]);
  const [user, setUser] = useState([]);
  const [coins, setCoins] = useState([]);
  const [payments, setPayments] = useState([]);
  const [motorListMaintance, setMotorListMaintance] = useState([]);

  useEffect(() => {
    async function getMotorAsync() {
      try {
        const url = "http://localhost:5000/motors";
        const response = await fetch(url);
        const responseJSON = await response.json();

        const url2 = "http://localhost:5000/orders";
        const response2 = await fetch(url2);
        const responseJSON2 = await response2.json();

        setPayments(responseJSON2);

        let n = new Date();
        let abc = responseJSON2.map((value) => {
          let utc = value.start;
          let d = new Date(
            utc.substr(0, 4),
            utc.substr(5, 2) - 1,
            utc.substr(8, 2),
            utc.substr(11, 2),
            utc.substr(14, 2),
            utc.substr(17, 2)
          );
          d.setHours(d.getHours() + 7);
          d.setSeconds(d.getSeconds() + value.duration);
          let temp = Math.floor((d - n) / 1000);
          return {
            left: temp,
            motor_id: value.motor_id,
            et: d,
            user_id: value.user_id,
          };
        });

        let def = abc.filter((value) => {
          return value.left > 0;
        });

        let ghi = abc.filter((value) => {
          return value.left < 0;
        });

        const newMotorList = [];
        responseJSON.forEach((value) => {
          def.forEach((order) => {
            if (value._id === order.motor_id) {
              let checkMotor = newMotorList.findIndex(
                (motor) => motor.motor_id === value._id
              );
              if (checkMotor > -1) {
                newMotorList.splice(checkMotor, 1);
                newMotorList.push({
                  sort: 2,
                  motor_id: order.motor_id,
                  left: order.left,
                  name: value.name,
                  color: value.color,
                  cc: value.cc,
                  brand: value.brand,
                  status: "RENTING",
                  price_oneday: value.price_oneday,
                  price_oneweek: value.price_oneweek,
                  price_onemonth: value.price_onemonth,
                  create_at: value.create_at,
                  user_id: order.user_id,
                });
              } else {
                newMotorList.push({
                  sort: 2,
                  motor_id: order.motor_id,
                  left: order.left,
                  name: value.name,
                  color: value.color,
                  cc: value.cc,
                  brand: value.brand,
                  status: "RENTING",
                  price_oneday: value.price_oneday,
                  price_oneweek: value.price_oneweek,
                  price_onemonth: value.price_onemonth,
                  create_at: value.create_at,
                  user_id: order.user_id,
                });
              }
            }
          });
        });

        ghi.sort((a, b) => b.left - a.left);
        responseJSON.forEach((value) => {
          ghi.forEach((order) => {
            if (value._id === order.motor_id) {
              if (!newMotorList.some((motor) => motor.motor_id === value._id)) {
                if (!value.is_refresh) {
                  newMotorList.push({
                    sort: 1,
                    motor_id: value._id,
                    name: value.name,
                    color: value.color,
                    cc: value.cc,
                    brand: value.brand,
                    status: "MAINTANCE",
                    price_oneday: value.price_oneday,
                    price_oneweek: value.price_oneweek,
                    price_onemonth: value.price_onemonth,
                    create_at: value.create_at,
                    duration: order.duration,
                    expiration_time: order.et,
                  });
                  motorListMaintance.push({
                    motor_id: value._id,
                    name: value.name,
                    color: value.color,
                    cc: value.cc,
                    brand: value.brand,
                    expiration_time: order.et,
                    left: order.left,
                  });
                } else {
                  newMotorList.push({
                    sort: 0,
                    motor_id: value._id,
                    name: value.name,
                    color: value.color,
                    cc: value.cc,
                    brand: value.brand,
                    status: "READY",
                    price_oneday: value.price_oneday,
                    price_oneweek: value.price_oneweek,
                    price_onemonth: value.price_onemonth,
                    create_at: value.create_at,
                  });
                }
              }
            }
          });
        });

        newMotorList.sort((a, b) => a.sort - b.sort);
        newMotorList.sort((a, b) => a.left - b.left);
        setMotorList(newMotorList);
      } catch (err) {
        console.log(`Fail to fetch Motor List: ${err}`);
      }
    }
    getMotorAsync();
  }, []);

  useEffect(() => {
    async function getCoinsAsync() {
      try {
        const url = "http://localhost:5000/transactions";
        const response = await fetch(url);
        const responseJSON = await response.json();
        setCoins(responseJSON);
      } catch (err) {
        console.log(`Fail to fetch Coins List: ${err}`);
      }
    }
    getCoinsAsync();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      let temp = JSON.parse(localStorage.getItem("user-info"));
      setUser(temp);
    }
  }, []);

  const getUser = (data) => {
    const userCoins = coins.filter((value) => value.user_id === data._id);
    const userCoin = userCoins.reduce((a, b) => a + b.plus, data.coins);

    const userPayments = payments.filter((value) => value.user_id === data._id);
    const userPayment = userPayments.reduce((a, b) => a + b.price, data.coins);

    data.coins = userCoin - userPayment;
    localStorage.setItem("user-info", JSON.stringify(data));
    setUser(data);
  };

  const getRentInfo = async (motor, price, durationRent, index) => {
    try {
      let result = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user._id,
          motor_id: motor,
          duration: durationRent,
          price: price,
        }),
      });
      result = await result.json();

      let result2 = await fetch(`http://localhost:5000/motors/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_refresh: false,
          motorId: motor,
        }),
      });
      result2 = await result2.json();

      let temp = JSON.parse(localStorage.getItem("user-info"));
      temp.coins = temp.coins - price;
      localStorage.setItem("user-info", JSON.stringify(temp));
      setUser(temp);

      motorList[index].left = durationRent;
      setMotorList([...motorList]);

      // Get UTC Time
      let unix_timestamp = Math.floor(new Date().getTime() / 1000);
      let date = new Date(unix_timestamp * 1000);
      const year = date.getFullYear();
      const month = `0${date.getUTCMonth() + 1}`;
      const day = `0${date.getUTCDate()}`;
      const hours = "0" + date.getUTCHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime = `${year}-${month.substr(-2)}-${day.substr(
        -2
      )}T${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

      payments.push({
        _id: unix_timestamp,
        user_id: user._id,
        start: formattedTime,
        price: price,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const formatCash = (str) => {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
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

  const innerTime = (seconds) => {
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    if (days > 0) {
      return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else if (hours > 0) {
      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else if (minutes > 0) {
      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } else {
      return `${seconds} seconds`;
    }
  };

  return (
    <div className="App">
      <Router>
        <Header user={user} formatCash={(str) => formatCash(str)}></Header>
        <Switch>
          <Route path="/signup">
            <SignUp getUser={(data) => getUser(data)}></SignUp>
          </Route>
          <Route path="/signin">
            <SignIn getUser={(data) => getUser(data)}></SignIn>
          </Route>
          <Route path="/history-rent-pay">
            <HistoryRentPay
              coins={coins}
              payments={payments}
              user={user._id}
              motorList={motorList}
              formatCash={(str) => formatCash(str)}
              innerTime={(sec) => innerTime(sec)}
            ></HistoryRentPay>
          </Route>
          <Route path="/admin/">
            <Admin
              motorListMaintance={motorListMaintance}
              coins={coins}
              payments={payments}
              formatCash={(str) => formatCash(str)}
              motorList={motorList}
              splitTime={(seconds, unit) => splitTime(seconds, unit)}
              innerTime={(sec) => innerTime(sec)}
            ></Admin>
          </Route>
          <Route path="/">
            <AfterHeader></AfterHeader>
            <PreMain></PreMain>
            <Main
              coin={user.coins}
              motorList={motorList}
              getRentInfo={(motor, price, durationRent, index) =>
                getRentInfo(motor, price, durationRent, index)
              }
              splitTime={(seconds, unit) => splitTime(seconds, unit)}
              formatCash={(str) => formatCash(str)}
              innerTime={(sec) => innerTime(sec)}
            ></Main>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
