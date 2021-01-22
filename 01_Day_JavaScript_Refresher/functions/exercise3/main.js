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
  let newArray = array.slice();
  let listIndexRandom = [];
  for (let j = 0; j < array.length; j++) {
    listIndexRandom.push(j);
  }
  for (let i = 0; i < array.length; i++) {
    let a = Math.floor(Math.random() * array.length);
    if (listIndexRandom.indexOf(a)) {
      listIndexRandom.splice(listIndexRandom.indexOf(a), 1);
    } else {
      array[i] = newArray[a];
    }
  }
  console.log(newArray);
}

shuffleArray([0, 1, 2, 3, 4, 5]);
