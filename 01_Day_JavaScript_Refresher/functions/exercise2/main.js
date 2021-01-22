/* ------ Exercises: Level 2 ------ */

// 1: Quadratic equation is calculated as follows: ax2 + bx + c = 0. Write a function which calculates value or values of a quadratic equation, solveQuadEquation.
// 2: Declare a function name printArray. It takes array as a parameter and it prints out each value of the array.
function printArray(array) {
  for (let value of array) {
    console.log(value);
  }
}

// 3: Write a function name showDateTime which shows time in this format: 08/01/2020 04:08 using the Date object.
function showDateTime() {
  let now = new Date();
  let date = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  let hour = now.getHours();
  let minute = now.getMinutes();
  console.log(`${date}/${month}/${year} ${hour}:${minute}`);
}

// 4: Declare a function name swapValues. This function swaps value of x to y.
function swapValues(a, b) {
  let z = a;
  a = b;
  b = z;
  console.log(a, b);
}

// 5: Declare a function name reverseArray. It takes array as a parameter and it returns the reverse of the array (don't use method).
function reverseArray(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[array.length - i - 1];
  }
  array = newArray;
  console.log(array);
}

// 6: Declare a function name capitalizeArray. It takes array as a parameter and it returns the - capitalizedarray.
function capitalizeArray(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    let a = array[i].toUpperCase();
    newArray.push(a);
  }
  array = newArray;
}

// 7: Declare a function name addItem. It takes an item parameter and it returns an array after adding the item
function addItem(...params) {
  let res = [];
  res.push(...params);
  console.log(res);
}

// 8: Declare a function name removeItem. It takes an index parameter and it returns an array after removing an item
function removeItem(array, index) {
  array.splice(index, 1);
  console.log(array);
}

// 9: Declare a function name evensAndOdds . It takes a positive integer as parameter and it counts number of evens and odds in the number.
function evenAndOdd(number) {
  let even = 0;
  let odd = 0;
  for (i = 0; i <= number; i++) {
    if (i % 2 === 0) {
      even++;
    } else {
      odd++;
    }
  }
  console.log(`The number of odd are ${odd}.
The number of even are ${even}.`);
}

// 13 (10): Write a function which takes any number of arguments and return the sum of the arguments
function sum() {
  var s = 0;
  for (let i = 0; i < arguments.length; i++) {
    s += arguments[i];
  }
  console.log(s);
}

// 1 (11): Declare a function name userIdGenerator. When this function is called it generates seven character id. The function return the id.
function userIdGenerator() {
  let id = "";
  let randomString =
    "~!@#$%^&*())_+`-=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    id += randomString[Math.floor(Math.random() * (randomString.length - 1))];
  }
  console.log(id);
}
