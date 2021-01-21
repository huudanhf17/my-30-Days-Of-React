import countries from "./countries.js";
import webTechs from "./web_techs.js";

/* ----- Exercise: Level 2-2 ----- */
/* 
First remove all the punctuations and change the string to array and count the number of words in the array 
Output:
["I", "love", "teaching", "and", "empowering", "people", "I", "teach", "HTML", "CSS", "JS", "React", "Python"]
13
*/

let text =
  "I love teaching and empowering people. I teach HTML, CSS, JS, React, Python.";

var removeAllPunctuations = text.replace(/[.,]/g, "");
var words = removeAllPunctuations.split(" ");

// console.log(words);
// console.log(words.length);

/* ----- Exercise: Level 2-3 ----- */
/*
In the following shopping cart add, remove, edit items
const shoppingCart = ['Milk', 'Coffee', 'Tea', 'Honey']
add 'Meat' in the beginning of your shopping cart if it has not been already added
add Sugar at the end of you shopping cart if it has not been already added
remove 'Honey' if you are allergic to honey
modify Tea to 'Green Tea'
*/

const shoppingCart = ["Milk", "Coffee", "Tea", "Honey"];

if (!shoppingCart.includes("Meat")) {
  shoppingCart.unshift("Meat");
}

if (!shoppingCart.includes("Sugar")) {
  shoppingCart.push("Sugar");
}

const areYouAllergicToHoney = false;
if (areYouAllergicToHoney) {
  var e23c = shoppingCart.filter((value, index) => {
    return value !== "Honey";
  });
} else {
  var e23c = shoppingCart;
}

const e23d1 = shoppingCart.indexOf("Tea");
shoppingCart[e23d1] = "Green Tea";

/* ----- Exercise: Level 2-4 ----- */
// In countries array check if 'Ethiopia' exists in the array if it exists print 'ETHIOPIA'. If it does not exist add to the countries list.

if (countries.includes("Ethiopia")) {
  countries.push("Ethiopia");
} else {
  //  console.log("ETHIOPIA");
}

/* ----- Exercise: Level 2-5 ----- */
// In the webTechs array check if Sass exists in the array and if it exists print 'Sass is a CSS preprocess'. If it does not exist add Sass to the array and print the array.

if (webTechs.includes("Sass")) {
  console.log("Sass is a CSS preprocess");
} else {
  webTechs.push("Sass");
}

/* ----- Exercise: Level 2-6 ----- */
// Concatenate the following two variables and store it in a fullStack variable.

const frontEnd = ["HTML", "CSS", "JS", "React", "Redux"];
const backEnd = ["Node", "Express", "MongoDB"];
const fullStack = frontEnd.concat(backEnd);
//console.log(fullStack);
