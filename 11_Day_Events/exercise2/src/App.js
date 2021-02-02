import logo from "./logo.svg";
import "./App.css";

function App() {
  const randomPos = () => {
    const generatorRandom = () => {
      let number = Math.floor(Math.random() * 600);
      return `${number}px`;
    };
    const generatorRandom2 = () => {
      let number = Math.floor(Math.random() * 1200);
      return `${number}px`;
    };
    let img = document.querySelector(".App-logo");
    img.style.top = generatorRandom();
    img.style.left = generatorRandom2();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          onMouseEnter={() => randomPos()}
        />
      </header>
    </div>
  );
}

export default App;
