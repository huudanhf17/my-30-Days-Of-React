/* ----- Exercises: Level 1-1 ----- */
// Get user input using prompt(“Enter your age:”). If user is 18 or older , give feedback:'You are old enough to drive' but if not 18 give another feedback stating to wait for the number of years he needs to turn 18.

let age = prompt("Enter your age:");
let html = "";

if (age >= 18) {
  html += `<h1>You are old enough to drive.</h1>`;
} else {
  html += `<h1>You are left with ${18 - age} years to drive.</h1>`;
}

/* ----- Exercises: Level 1-2 ----- */
// Compare the values of myAge and yourAge using if … else. Based on the comparison and log the result to console stating who is older (me or you). Use prompt(“Enter your age:”) to get the age as input.

let myAge = 25;
if (age > myAge) {
  html += `<p>You are ${age - myAge} years older than me.</p>`;
} else if (age < myAge) {
  html += `<p>I am ${age - myAge} years older than you.</p>`;
} else {
  html += `<p>You and me have same age!</p>`;
}

/* ----- Exercises: Level 1-3 ----- */
// If a is greater than b return 'a is greater than b' else 'a is less than b'. Try to implement it in two ways

let a = 4;
let b = 3;
if (a >= b) {
  html += `<p>a is greater than or equal b</p>`;
} else {
  html += `<p>a is less than b</p>`;
}

a >= b
  ? (html += `<p>a is greater than or equal b</p>`)
  : (html += `<p>a is less than b</p>`);

document.getElementById("root").innerHTML = html;

/* ----- Exercises: Level 1-4 ----- */
let number = 9;
if (number % 2 === 0) {
  console.log(`${number} is an even number`);
} else {
  console.log(`${number} is an odd number.`);
}
