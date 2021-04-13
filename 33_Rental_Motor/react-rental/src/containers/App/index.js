import moment from "moment";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AfterHeader from "../../components/AfterHeader";
import Footer from "../../components/Footer/";
import Header from "../../components/Header/";
import HistoryRentPay from "../../components/HistoryRentPay/HistoryRentPay";
import PreMain from "../../components/PreMain";
import ProtectRoute from "../../components/ProtectRoute";
import Admin from "../Admin";
import Main from "../Main";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import "./App.scss";

const axios = require("axios").default;
const url = "http://localhost:5000/";

function App() {
  const [motorList, setMotorList] = useState([]);
  const [user, setUser] = useState({});
  const [coins, setCoins] = useState([]);
  const [payments, setPayments] = useState([]);
  const [motorListMaintance, setMotorListMaintance] = useState(1);
  const [refreshData, setRefreshData] = useState(0);
  const [reNewRefreshMotor, setReNewRefreshMotor] = useState(0);
  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    async function getMotorAsync() {
      try {
        const response = await axios(url + "motors");
        const responseJSON = await response.data;

        const response2 = await axios(url + "orders/lasted");
        const responseJSON2 = await response2.data;

        // setPayments(responseJSON2);
        let n = new Date();
        let abc = responseJSON2.map((value) => {
          //Pure JS
          // let utc = value.start;
          // let d = new Date(
          //   utc.substr(0, 4),
          //   utc.substr(5, 2) - 1,
          //   utc.substr(8, 2),
          //   utc.substr(11, 2),
          //   utc.substr(14, 2),
          //   utc.substr(17, 2)
          // );
          // d.setHours(d.getHours() + 7);
          // d.setSeconds(d.getSeconds() + value.duration);

          //MomentJS
          let d = moment.utc(value.start).add(value.duration, "seconds").local()
            ._d;

          let temp = Math.floor((d - n) / 1000);
          return {
            left: temp,
            motor_id: value.motor_id,
            et: d,
            user_id: value.user_id,
            isBanned: value.isBanned,
            order_id: value._id,
          };
        });

        let def = abc.filter((value) => {
          return value.left > 0;
        });

        let ghi = abc.filter((value) => {
          return value.left < 0;
        });

        const newMotorList = [];
        const tempMotorListMaintance = [];
        const tempReNewRefreshMotor = [];
        responseJSON.forEach((value) => {
          def.forEach((order) => {
            if (value._id === order.motor_id && order.isBanned === "no") {
              let checkMotor = newMotorList.findIndex(
                (motor) => motor.motor_id === value._id
              );
              if (checkMotor > -1) {
                newMotorList.splice(checkMotor, 1);
                newMotorList.push({
                  sort: 3,
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
                  order_id: order.order_id,
                });
              } else {
                newMotorList.push({
                  sort: 3,
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
                  order_id: order.order_id,
                });
                tempReNewRefreshMotor.push(order.left);
              }
            } else if (
              value._id === order.motor_id &&
              order.isBanned === "yes"
            ) {
              newMotorList.push({
                sort: 2,
                motor_id: order.motor_id,
                name: value.name,
                color: value.color,
                cc: value.cc,
                brand: value.brand,
                status: "MAINTANCE",
                price_oneday: value.price_oneday,
                price_oneweek: value.price_oneweek,
                price_onemonth: value.price_onemonth,
                create_at: value.create_at,
              });

              tempMotorListMaintance.push({
                motor_id: value._id,
                name: value.name,
                color: value.color,
                cc: value.cc,
                brand: value.brand,
                expiration_time: order.et,
                left: order.left,
                order_id: order.order_id,
              });
            }
          });
          setReNewRefreshMotor(Math.min(...tempReNewRefreshMotor));
        });

        ghi.sort((a, b) => b.left - a.left);
        responseJSON.forEach((value) => {
          ghi.forEach((order) => {
            if (value._id === order.motor_id) {
              if (!newMotorList.some((motor) => motor.motor_id === value._id)) {
                if (!value.is_refresh) {
                  newMotorList.push({
                    sort: 2,
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
                  tempMotorListMaintance.push({
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
          if (!newMotorList.some((motor) => motor.motor_id === value._id)) {
            newMotorList.push({
              sort: 1,
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
        });

        setMotorListMaintance(tempMotorListMaintance);

        newMotorList.sort((a, b) => a.sort - b.sort);
        newMotorList.sort((a, b) => a.left - b.left);
        setMotorList(newMotorList);
      } catch (err) {
        console.log(`Fail to axios Motor List: ${err}`);
      }
    }
    getMotorAsync();
  }, [refreshData]);

  // useEffect(() => {
  //   async function getCoinsAsync() {
  //     try {
  //       const response = await axios(url + "transactions", {
  //         withCredentials: true,
  //       });
  //       const responseJSON = await response.data;
  //       setCoins(responseJSON);
  //     } catch (err) {
  //       console.log(`Fail to axios Coins List: ${err}`);
  //     }
  //   }
  //   getCoinsAsync();
  // }, [user]);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      let temp = JSON.parse(localStorage.getItem("user-info"));
      // setIsAuth(true);
      // temp.type === "admin" ? setIsAdmin(true) : setIsAdmin(1);
      // axiosPaymentListAsync(temp._id);
      // axiosOrderListAsync(temp._id);
      // axiosUserAsync(temp._id);
      getUser(temp);
    } else {
      setIsAuth(false);
    }
  }, []);

  const getUser = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        withCredentials: true,
        url: url + "transactions/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          user_id: data._id,
        },
      });
      let paymentData = response.data;
      setCoins(paymentData);

      const response2 = await axios({
        method: "POST",
        withCredentials: true,
        url: url + "orders/userid",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          user_id: data._id,
        },
      });
      let orderData = response2.data;
      setPayments(orderData);

      const response3 = await axios({
        method: "POST",
        withCredentials: true,
        url: url + "api/user/id",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          user_id: data._id,
        },
      });
      let userData = response3.data;

      const userCoin = paymentData.reduce((a, b) => a + b.plus, data.coins);
      const userPayment = orderData.reduce((a, b) => a + b.price, data.coins);

      userData.coins = userCoin - userPayment;
      localStorage.setItem("user-info", JSON.stringify(data));
      setUser(userData);
      setIsAuth(true);
      data.type === "admin" ? setIsAdmin(true) : setIsAdmin(1);
    } catch (err) {
      console.log(`Fail to get User async ${err}`);
    }
  };

  const getRentInfo = async (motor, price, durationRent, index) => {
    try {
      let result = await axios({
        method: "POST",
        url: url + "orders",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          user_id: user._id,
          motor_id: motor,
          duration: durationRent,
          price: price,
        },
      });
      result = await result.data;

      let result2 = await axios({
        method: "PATCH",
        url: url + "motors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          is_refresh: false,
          motorId: motor,
        },
      });
      result2 = await result2.data;

      let temp = JSON.parse(localStorage.getItem("user-info"));
      temp.coins = temp.coins - price;
      localStorage.setItem("user-info", JSON.stringify(temp));
      setUser(temp);

      setRefreshData(Math.random());

      // PureJS -- Get UTC Time
      // let unix_timestamp = Math.floor(new Date().getTime() / 1000);
      // let date = new Date(unix_timestamp * 1000);
      // const year = date.getFullYear();
      // const month = `0${date.getUTCMonth() + 1}`;
      // const day = `0${date.getUTCDate()}`;
      // const hours = "0" + date.getUTCHours();
      // const minutes = "0" + date.getMinutes();
      // const seconds = "0" + date.getSeconds();
      // const formattedTime = `${year}-${month.substr(-2)}-${day.substr(
      //   -2
      // )}T${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

      //MomentJS
      let formattedTime = moment
        .utc()
        .format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

      payments.push({
        _id: formattedTime,
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
          <ProtectRoute
            path="/signup"
            component={SignUp}
            isAuth={!isAuth}
            getUser={(data) => getUser(data)}
          ></ProtectRoute>

          <ProtectRoute
            path="/signin"
            component={SignIn}
            isAuth={!isAuth}
            getUser={(data) => getUser(data)}
          ></ProtectRoute>

          <ProtectRoute
            path="/history-rent-pay"
            component={HistoryRentPay}
            isAuth={isAuth}
            coins={coins}
            payments={payments}
            user={user._id}
            motorList={motorList}
            formatCash={(str) => formatCash(str)}
            innerTime={(sec) => innerTime(sec)}
          ></ProtectRoute>

          <ProtectRoute
            path="/admin/"
            component={Admin}
            isAuth={isAdmin}
            motorListMaintance={motorListMaintance}
            coins={coins}
            payments={payments}
            formatCash={(str) => formatCash(str)}
            motorList={motorList}
            splitTime={(seconds, unit) => splitTime(seconds, unit)}
            innerTime={(sec) => innerTime(sec)}
            setRefreshData={(num) => setRefreshData(num)}
          ></ProtectRoute>
          <Route path="/admin/">
            {/* <Admin
              motorListMaintance={motorListMaintance}
              coins={coins}
              payments={payments}
              formatCash={(str) => formatCash(str)}
              motorList={motorList}
              splitTime={(seconds, unit) => splitTime(seconds, unit)}
              innerTime={(sec) => innerTime(sec)}
              setRefreshData={(num) => setRefreshData(num)}
            ></Admin> */}
          </Route>
          <Route path="/">
            <AfterHeader></AfterHeader>
            <PreMain></PreMain>
            <Main
              coin={user.coins}
              type={user.type}
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
