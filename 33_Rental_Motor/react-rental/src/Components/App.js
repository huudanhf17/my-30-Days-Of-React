import logo from "../logo.svg";
import "./App.css";
import Header from "./Header";
import PreMain from "./PreMain";
import AfterHeader from "./AfterHeader";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <AfterHeader></AfterHeader>
      <PreMain></PreMain>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
