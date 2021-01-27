import "./App.css";
import E21 from "./Component/E21";
import E22 from "./Component/E22";
import E23 from "./Component/E23";
import E32a from "./Component/E32a";
import E32b from "./Component/E32b";

const hexaColor = () => {
  let str = "0123456789abcdef";
  let color = "";
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * str.length);
    color += str[index];
  }
  return "#" + color;
};

let skills = [
  "HTML",
  "CSS",
  "Sass",
  "JS",
  "React",
  "Redux",
  "Node",
  "MongoDB",
  "Python",
  "Flash",
  "Django",
  "Pandas",
  "Data Analysis",
  "MYSQL",
  "GraphQL",
  "D3.js",
  "Gatsby",
  "Docker",
  "Heroku",
  "Git",
];

const mappingSkill = () => skills.map((skill) => <E32b name={skill}></E32b>);

function App() {
  return (
    <div className="App">
      <E21></E21>
      <E22></E22>
      <E23 color={() => hexaColor()}></E23>
      <E23 color={() => hexaColor()}></E23>
      <E23 color={() => hexaColor()}></E23>
      <E23 color={() => hexaColor()}></E23>
      <E23 color={() => hexaColor()}></E23>
      <E32a></E32a>
      <div className="left">{mappingSkill()}</div>
    </div>
  );
}

export default App;
