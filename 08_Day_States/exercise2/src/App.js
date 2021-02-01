import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [background, setBackground] = useState("#282c34");

  const generatorHexa = () => {
    let random = `0123456789`;
    let res = `#`;
    for (let i = 0; i < 5; i++) {
      res[i].push();
    }
    return;
  };

  const btnOnClick = () => {
    if (background === "white") {
      setBackground("#282c34");
    } else {
      setBackground("white");
    }
  };
  return (
    <div className="App">
      <header className="App-header" style={{ "background-color": background }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <hr></hr>
        <button onClick={() => btnOnClick()}>Change Background Color</button>
      </header>
    </div>
  );
}

export default App;
