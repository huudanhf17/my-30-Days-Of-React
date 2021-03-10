import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Control from "./Control";
import Country from "./Country";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const res = axios.get("https://restcountries.eu/rest/v2/all");
    console.log(res);
    setData(res.data);
  }, []);
  return (
    <div className="App">
      <header id="countries" className="country-header">
        <h2 className="">World Countries Data</h2>
        <p className="subtitle">Currently, we have 250 countries</p>
      </header>
      <Control></Control>
      <div className="countries-wrapper">
        <Country></Country>
      </div>
    </div>
  );
}

export default App;
