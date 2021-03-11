import { getDefaultNormalizer } from "@testing-library/dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Control from "./Control";
import Country from "./Country";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("https://restcountries.eu/rest/v2/all");
        setData(res.data);
      } catch (err) {
        console.log("Fail to Get Data from API " + err);
      }
    }
    getData();
  }, []);

  const getSearchStr = (str) => {
    console.log(str);
  };
  return (
    <div className="App">
      <header id="countries" className="country-header">
        <h2 className="">World Countries Data</h2>
        <p className="subtitle">Currently, we have 250 countries</p>
      </header>
      <Control getSearchStr={(str) => getSearchStr(str)}></Control>
      <div className="countries-wrapper">
        {data.map((value) => (
          <Country
            key={value.name}
            flag={value.flag}
            name={value.name}
            capital={value.capital}
            languages={value.languages}
            population={value.population}
            currencies={value.currencies}
          ></Country>
        ))}
      </div>
    </div>
  );
}

export default App;
