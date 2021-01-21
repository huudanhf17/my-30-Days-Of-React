/* ----- Exercises: Level 2 ------ */

const users = {
  Alex: {
    email: "alex@alex.com",
    skills: ["HTML", "CSS", "JavaScript"],
    age: 20,
    isLoggedIn: false,
    points: 30,
  },
  Asab: {
    email: "asab@asab.com",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Redux",
      "MongoDB",
      "Express",
      "React",
      "Node",
    ],
    age: 25,
    isLoggedIn: false,
    points: 50,
  },
  Brook: {
    email: "daniel@daniel.com",
    skills: ["HTML", "CSS", "JavaScript", "React", "Redux"],
    age: 30,
    isLoggedIn: true,
    points: 50,
  },
  Daniel: {
    email: "daniel@alex.com",
    skills: ["HTML", "CSS", "JavaScript", "Python"],
    age: 20,
    isLoggedIn: false,
    points: 40,
  },
  John: {
    email: "john@john.com",
    skills: ["HTML", "CSS", "JavaScript", "React", "Redux", "Node.js"],
    age: 20,
    isLoggedIn: true,
    points: 50,
  },
  Thomas: {
    email: "thomas@thomas.com",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    age: 20,
    isLoggedIn: false,
    points: 40,
  },
  Paul: {
    email: "paul@paul.com",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "MongoDB",
      "Express",
      "React",
      "Node",
    ],
    age: 20,
    isLoggedIn: false,
    points: 40,
  },
};

// 1: Find the person who has many skills in the users object.
const values = Object.entries(users);
let skills = [];
let indexSkills = -1;
for (let i = 0; i < values.length; i++) {
  skills.push(values[i][1].skills.length);
}

var maxSkills = Math.max(...skills);
for (let i = 0; i < values.length; i++) {
  if (values[i][1].skills.length === maxSkills) {
    var indexMaxSkill = i;
  }
}

// 2: Count logged in users,count users having greater than equal to 50 points from the following object.
let isLoggedIn = [];
for (let i = 0; i < values.length; i++) {
  isLoggedIn.push(values[i][1].isLoggedIn);
}
let allIsLogIn = isLoggedIn.filter((x) => x === true);
let numberUsersLogIn = allIsLogIn.length;

let numberUsers50points = 0;
for (let i = 0; i < values.length; i++) {
  if (values[i][1].points >= 50) {
    numberUsers50points++;
  }
}
// 3: Find people who are MERN stack developer from the users object
let skillsOfUsers = [];
let mernStack = [];
for (let i = 0; i < values.length; i++) {
  if (
    values[i][1].skills.includes("MongoDB") &&
    values[i][1].skills.includes("Express") &&
    values[i][1].skills.includes("React") &&
    values[i][1].skills.includes("Node")
  ) {
    mernStack.push(values[i][0]);
  }
}

// 4: Set your name in the users object without modifying the original users object
users.Danh = {
  email: "huudanhf17@gmail.com",
  skills: ["HTML", "CSS", "JavaScript", "React"],
  age: 25,
  isLoggedIn: false,
  points: 50,
};

// 5: Get all keys or properties of users object
let keys = Object.keys(users);

// 6: Get all the values of users object
let valuess = Object.values(users);

// 7: Use the countries object to print a country name, capital, populations and languages.

// Undefined "countries object"
