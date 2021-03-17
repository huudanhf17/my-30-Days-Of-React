import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Control from "./Control";
import Country from "./Country";

function App() {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [topTenPopulation, setTopTenPopulation] = useState([]);
  const [topTenLanguages, setTopTenLanguages] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("https://restcountries.eu/rest/v2/all");
        const finalRes = res.data;
        setData(finalRes);
        setTempData(finalRes);

        const highestPopulation = [...finalRes].sort(
          (a, b) => b.population - a.population
        );
        highestPopulation.length = 10;
        setTopTenPopulation(highestPopulation);

        const mostLanguages = finalRes.map((value) => value.languages);
        const languagesList = mostLanguages.flat().map((value) => value.name);
        const languageList = new Set(languagesList);
        const mostLanguageList = [];

        for (let l of languageList) {
          const country = languagesList.filter((value) => value === l);
          mostLanguageList.push({ language: l, count: country.length });
        }
        console.log(mostLanguageList);
      } catch (err) {
        console.log("Fail to Get Data from API " + err);
      }
    }
    getData();
  }, []);

  const getSearchStr = (str) => {
    console.log(str);
    let res = tempData.filter((value) =>
      value.name.toLowerCase().includes(str.toLowerCase())
    );
    setData(res);
  };
  return (
    <div className="App">
      <header id="countries" className="country-header">
        <h2 className="">World Countries Data</h2>
        <p className="subtitle">Currently, we have 250 countries</p>
      </header>
      <Control getSearchStr={getSearchStr}></Control>
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

      <div className="graph-wrapper">
        <div className="graph-buttons">
          <button className="population">Population</button>
          <button className="languages">Languages</button>
        </div>
        <h4 className="graph-title">
          {/* {graph === 'population' && value === ''
            ? '10 Most populated countries in the world'
            : '10 Most spoken languages in the world'} */}
        </h4>
        <div className="graphs">
          <div className="graph-wrapper" id="stat">
            {/* {graph === 'population' ? (
              <PopulationGraphBars
                populations={mostPopulatedCountries}
                className={graph}
              />
            ) : (
              <LanguageGraphBars
                languages={mostSpokenLanguages}
                className={graph}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
