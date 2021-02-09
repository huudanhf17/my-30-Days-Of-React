import logo from "../logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import PreMain from "./PreMain";
import AfterHeader from "./AfterHeader";
import Main from "./Main";
import Footer from "./Footer";
import SignIn from "./SignIn";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/signin">
            <SignIn></SignIn>
          </Route>
          <Route path="/">
            <AfterHeader></AfterHeader>
            <PreMain></PreMain>
            <Main></Main>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
