/* ------- Exercises: Level 1 ------- */

// 1: How do you write a pure JavaScript function?
function priceAfterTax(productPrice) {
  return productPrice * 0.1 + productPrice;
}

// 2: What is inheritance and how do you make a child from a parent class?
let rootDiv = document.getElementById("root");
rootDiv.innerHTML = "Testing...";
const childDiv = document.createElement("div");
childDiv.innerHTML = "Child Div Testing...";
rootDiv.appendChild(childDiv);

// 3: What is class based React component ?
// Class based React component is simply classes (made up of multiple functions that add functionality to the application). All class-based components are child classes for the Component class of ReactJS.

// 4: What is the difference between functional React component and class based React component ?
// Syntax - Performance

// 5: When do we need to use class based components instead of functional components?
// We don't need anymore.

// 6: What is the use cases of class based component?
// I don't think we need use class based component anymore.

// 7: Which type of component do use most frequently ? functional or class-based component
// Performance: functional component

// 8: What is React life cycle ? (not covered yet) ?
/*
Each component in React has a lifecycle which you can monitor and manipulate during its three main phases.
The three phases are: Mounting, Updating, and Unmounting.

Mounting: constructor() - getDerivedStateFromProps() - render() - componentDidMount()
Updating: getDerivedStateFromProps() - shouldComponentUpdate() - render() - getSnapshotBeforeUpdate() - componentDidUpdate()
Unmounting: componentWillUnmount()
*/

// 9: What is state in React?
/*
React components has a built-in state object.
The state object is where you store property values that belongs to the component.
When the state object changes, the component re-renders.
*/
