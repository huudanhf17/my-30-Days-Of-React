/* ----- Exercises: Level 2-1 ----- */
/*
Write a code which can give grades to students according to theirs scores
80-100, A
70-89, B
60-69, C
50-59, D
0-49, F
*/
let score = 2;
if (score >= 80) {
  console.log("A");
} else if (score >= 70) {
  console.log("B");
} else if (score >= 60) {
  console.log("C");
} else if (score >= 50) {
  console.log("D");
} else {
  console.log("F");
}

/* ----- Exercises: Level 2-2 ----- */
/*
Check if the season is Autumn, Winter, Spring or Summer. If the user input is :
September, October or November, the season is Autumn.
December, January or February, the season is Winter.
March, April or May, the season is Spring
June, July or August, the season is Summer
*/

btn.onclick = () => {
  if (month.value === "September") {
    res.innerHTML = "The season is Autumn.";
  } else if (month.value === "October ") {
    res.innerHTML = "The season is Autumn.";
  } else if (month.value === "November ") {
    res.innerHTML = "The season is Autumn.";
  } else if (month.value === "December ") {
    res.innerHTML = "The season is Winter.";
  } else if (month.value === "January") {
    res.innerHTML = "The season is Winter.";
  } else if (month.value === "February") {
    res.innerHTML = "The season is Winter.";
  } else if (month.value === "March") {
    res.innerHTML = "The season is Spring.";
  } else if (month.value === "April") {
    res.innerHTML = "The season is Spring.";
  } else if (month.value === "May") {
    res.innerHTML = "The season is Spring.";
  } else {
    res.innerHTML = "The season is Summer.";
  }
};

/* ----- Exercises: Level 2-3 ----- */
/*
What is the day  today? Saturday
    Saturday is a weekend.

    What is the day today? saturDaY
    Saturday is a weekend.

    What is the day today? Friday
    Friday is a working day.

    What is the day today? FrIDAy
    Friday is a working day.
*/

btn2.onclick = () => {
  if (day.value.toLowerCase() === "saturday") {
    res2.innerHTML = `${day.value} is a weekend.`;
  } else if (day.value.toLowerCase() === "sunday") {
    res2.innerHTML = `${day.value} is a weekend.`;
  } else {
    res2.innerHTML = `${day.value} is a working day.`;
  }
};
