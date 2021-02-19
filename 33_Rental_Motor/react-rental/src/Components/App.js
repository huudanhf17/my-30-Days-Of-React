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

function App() {
  const [motorList, setMotorList] = useState([]);
  const [user, setUser] = useState([]);
  const [coins, setCoins] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getMotorAsync() {
      try {
        const url = "http://localhost:5000/motors";
        const response = await fetch(url);
        const responseJSON = await response.json();
        setMotorList(responseJSON);
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
    async function getOrdersAsync() {
      try {
        const url = "http://localhost:5000/orders";
        const response = await fetch(url);
        const responseJSON = await response.json();
        setOrders(responseJSON);
        if (true) {
          console.log(responseJSON[0].start);
          let utc = responseJSON[0].start;
          let d = new Date(
            utc.substr(0, 4),
            utc.substr(5, 2),
            utc.substr(8, 2),
            utc.substr(11, 2),
            utc.substr(14, 2),
            utc.substr(17, 2)
          );
          d.setHours(d.getHours() + 7);
          console.log(d);
        }
      } catch (err) {
        console.log(`Fail to fetch Orders List: ${err}`);
      }
    }
    getOrdersAsync();
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
    data.coins = userCoin;
    localStorage.setItem("user-info", JSON.stringify(data));
    setUser(data);
  };

  const getRentInfo = (motor, price) => {
    console.log(motor, price);
    let temp = JSON.parse(localStorage.getItem("user-info"));
    temp.coins = temp.coins - price;
    localStorage.setItem("user-info", JSON.stringify(temp));
    setUser(temp);
  };

  return (
    <div className="App">
      <Router>
        <Header user={user}></Header>
        <Switch>
          <Route path="/signup">
            <SignUp getUser={(data) => getUser(data)}></SignUp>
          </Route>
          <Route path="/signin">
            <SignIn getUser={(data) => getUser(data)}></SignIn>
          </Route>
          <Route path="/">
            <AfterHeader></AfterHeader>
            <PreMain></PreMain>
            <Main
              motorList={motorList}
              getRentInfo={(motor, price) => getRentInfo(motor, price)}
            ></Main>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
