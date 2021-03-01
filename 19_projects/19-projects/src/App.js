import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [data, setData] = useState([]);
  //let [weightMetric, setWeightMetric] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.thecatapi.com/v1/breeds");
      setData(result.data);
    };
    fetchData();
  }, []);

  // calculateAverage = () => {
  //   const weightAndAge = this.state.data.map((cat) => {
  //     const weight = cat.weight.metric
  //       .split(' - ')
  //       .reduce((acc, cur) => +acc + +cur)
  //     const age = cat.life_span.split(' - ').reduce((acc, cur) => +acc + +cur)
  //     return {
  //       weight: weight / 2,
  //       age: age / 2,
  //     }
  //   })

  //   let weight = 0
  //   let age = 0

  //   weightAndAge.forEach((item, i) => {
  //     weight += item.weight
  //     age += item.age
  //   })
  //   let average = {
  //     weight: (weight / weightAndAge.length).toFixed(2),
  //     age: (age / weightAndAge.length).toFixed(2),
  //   }

  //   return average
  // }

  return (
    <div className="App">
      <h1>30 DAYS OF REACT</h1>
      <h2>Day 19</h2>
      <h3>Cats Paradise</h3>
      <h4>There are {data.length} cat breeds</h4>
      <p>
        On average a cat can weight about {weightMetric / 2 / 67} Kg and lives
        13.75 years.
      </p>

      {data.map((value) => (
        <div className="cat-card" key={value.id}>
          <div className="cat-card-image">
            <img src={value.image?.url}></img>
          </div>
          <div className="cat-card-body">
            <div>
              <h1 className="cat-name">{value.name}</h1>
              <p className="cat-origin">
                <strong>{value.origin}</strong>
              </p>
            </div>
            <div className="cat-attributes">
              <p>Temperament: {value.temperament}</p>
              <p>Life Span: {value.life_span}</p>
              <p>Weight: {value.weight.metric}</p>
            </div>
            <div className="cat-desc">
              <p>
                <span>Description</span>
              </p>
              <p>{value.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default App;
