/* ----- Exercises: Level 1 ------ */
// 1: Declare a function fullName and it takes firstName, lastName as a parameter and it returns your full - name.
function fullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

// 2: Declare a function addNumbers and it takes two two parameters and it returns sum.
function addNumbers(a, b) {
  return a + b;
}

// 3: Area of a circle is calculated as follows: area = π x r x r. Write a function which calculates _areaOfCircle
function areaOfCircle(r) {
  return Math.PI * Math.pow(r, 2);
}

// 4: Temperature in oC can be converted to oF using this formula: oF = (oC x 9/5) + 32. Write a function which convert oC to oF convertCelciusToFahrenheit.
function convertCelciusToFahrenheit(number) {
  return oC * 1.8 + 32;
}

// 5: Body mass index(BMI) is calculated as follows: bmi = weight in Kg / (height x height) in m2. Write a function which calculates bmi. BMI is used to broadly define different weight groups in adults 20 years old or older.Check if a person is underweight, normal, overweight or obese based the information given below.
function bmi(kg, m) {
  let indexBmi = kg / Math.pow(m, 2);
  if (indexBmi >= 30) {
    return console.log("Obese");
  } else if (indexBmi >= 25) {
    return console.log("Overweight");
  } else if (indexBmi >= 18.5) {
    return console.log("Normal weight");
  } else {
    return console.log("Underweight");
  }
}

// 6: Write a function called checkSeason, it takes a month parameter and returns the season:Autumn, Winter, Spring or Summer.
function checkSeason(month) {
  if (month === 9) {
    console.log("The season is Autumn.");
  } else if (month === 8) {
    console.log("The season is Autumn.");
  } else if (month === 7) {
    console.log("The season is Autumn.");
  } else if (month === 10) {
    console.log("The season is Winter.");
  } else if (month === 11) {
    console.log("The season is Winter.");
  } else if (month === 12) {
    console.log("The season is Winter.");
  } else if (month === 1) {
    console.log("The season is Spring.");
  } else if (month === 2) {
    console.log("The season is Spring.");
  } else if (month === 3) {
    console.log("The season is Spring.");
  } else {
    console.log("The season is Summer.");
  }
}
