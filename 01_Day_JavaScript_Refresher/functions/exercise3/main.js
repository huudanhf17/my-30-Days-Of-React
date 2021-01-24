/* ------ Exercises: Level 3 ------ */

// 1: Declare a function name userIdGeneratedByUser. It doesn’t take any parameter but it takes two inputs using prompt(). One of the input is the number of characters and the second input is the number of ids which are supposed to be generated.
// const lengthId = prompt("Number of characters");
// const sumIds = prompt("Number of ids which are supposed to be generated");

// function userIdGeneratedByUser() {
//   let listIds = [];
//   let randomString =
//     "~!@#$%^&*())_+`-=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (let j = 0; j < sumIds; j++) {
//     let id = "";
//     for (let i = 0; i < lengthId; i++) {
//       id += randomString[Math.floor(Math.random() * (randomString.length - 1))];
//     }
//     listIds.push(id);
//   }
//   console.log(listIds);
// }
// userIdGeneratedByUser();

// 2: Write a function generateColors which can generate any number of hexa or rgb colors.
function generateColors(color, number) {
  if (color === "hexa") {
    let listColors = [];
    let randomString = "0123456789ABCDEF";
    for (let j = 0; j < number; j++) {
      let hexa = "#";
      for (let i = 0; i < 6; i++) {
        hexa +=
          randomString[Math.floor(Math.random() * (randomString.length - 1))];
      }
      listColors.push(hexa);
    }
    console.log(listColors);
  } else if (color === "rgb") {
    let listColors = [];
    for (let j = 0; j < number; j++) {
      let rgb = "rgb(";
      rgb += Math.ceil(Math.random() * 255);
      rgb += ", ";
      rgb += Math.ceil(Math.random() * 255);
      rgb += ", ";
      rgb += Math.ceil(Math.random() * 255);
      rgb += ")";
      listColors.push(rgb);
    }
    console.log(listColors);
  }
}

// 3: Call your function shuffleArray, it takes an array as a parameter and it returns a shuffled array
function shuffleArray(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  console.log(array);
}

// 4: Call your function factorial, it takes a whole number as a parameter and it return a factorial of the number
function factorial(number) {
  let far = 1;
  for (i = 2; i <= number; i++) {
    far *= i;
  }
  console.log(far);
}

// 5: Call your function isEmpty, it takes a parameter and it checks if it is empty or not
function isEmpty(parameter) {
  if (parameter == "") {
    console.log("Empty");
  } else {
    console.log("Not");
  }
}

// 6: Write a function called average, it takes an array parameter and returns the average of the items. Check if all the array items are number types. If not give return reasonable feedback.
function average (array) {
  if (array.every(value=>typeof value === 'number')){
    return array.reduce((acc,curValue)=>acc+curValue,0)/array.length
  } else {
    return "Some parameter isn't number";
  };
};