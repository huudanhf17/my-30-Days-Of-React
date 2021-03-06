/* ----- Exercises: Level 3 ----- */

// 1: Create an object literal called personAccount. It has firstName, lastName, incomes, expenses properties and it has totalIncome, totalExpense, accountInfo,addIncome, addExpense and accountBalance methods. Incomes is a set of incomes and its description and expenses is a set of incomes and its description.

let personAccount = {
  firstName: "Danh",
  lastName: "Trần",
  incomes: 0,
  expenses: 0,
  totalIncome: function () {
    return this.incomes;
  },
  totalExpense: function () {
    return this.expenses;
  },
  accountInfo: function () {
    return `${this.firstName} ${this.lastName} - ${this.incomes} - ${this.expenses}`;
  },
  addIncome: function (x) {
    this.incomes = this.incomes + x;
  },
  addExpense: function (x) {
    this.expenses = this.expenses + x;
  },
  accountBalance: function () {
    return this.incomes - this.expenses;
  },
};

// 2: Questions:2, 3 and 4 are based on the following two arrays:users and products ()
const users = [
  {
    _id: "ab12ex",
    username: "Alex",
    email: "alex@alex.com",
    password: "123123",
    createdAt: "08/01/2020 9:00 AM",
    isLoggedIn: false,
  },
  {
    _id: "fg12cy",
    username: "Asab",
    email: "asab@asab.com",
    password: "123456",
    createdAt: "08/01/2020 9:30 AM",
    isLoggedIn: true,
  },
  {
    _id: "zwf8md",
    username: "Brook",
    email: "brook@brook.com",
    password: "123111",
    createdAt: "08/01/2020 9:45 AM",
    isLoggedIn: true,
  },
  {
    _id: "eefamr",
    username: "Martha",
    email: "martha@martha.com",
    password: "123222",
    createdAt: "08/01/2020 9:50 AM",
    isLoggedIn: false,
  },
  {
    _id: "ghderc",
    username: "Thomas",
    email: "thomas@thomas.com",
    password: "123333",
    createdAt: "08/01/2020 10:00 AM",
    isLoggedIn: false,
  },
];

const products = [
  {
    _id: "eedfcf",
    name: "mobile phone",
    description: "Huawei Honor",
    price: 200,
    ratings: [
      { userId: "fg12cy", rate: 5 },
      { userId: "zwf8md", rate: 4.5 },
    ],
    likes: [],
  },
  {
    _id: "aegfal",
    name: "Laptop",
    description: "MacPro: System Darwin",
    price: 2500,
    ratings: [],
    likes: ["fg12cy"],
  },
  {
    _id: "hedfcg",
    name: "TV",
    description: "Smart TV:Procaster",
    price: 400,
    ratings: [{ userId: "fg12cy", rate: 5 }],
    likes: ["fg12cy"],
  },
];

// 2a: Imagine you are getting the above users collection from a MongoDB database. a. Create a function called signUp which allows user to add to the collection. If user exists, inform the user that he has already an account.
function signUp(username) {
  users.map(function (value) {
    if (value.username === username) {
      console.log("You already have an account.");
    }
  });
}

// 2b: Create a function called signIn which allows user to sign in to the application
function signIn(username, password) {
  users.map(function (value) {
    if (value.username === username && value.password == password) {
      console.log("Login successs");
    }
  });
}

// 3a: The products array has three elements and each of them has six properties. a. Create a function called rateProduct which rates the product
function rateProduct(productId, userID, number) {
  products.map((value) => {
    if (value._id === productId) {
      value.ratings.push({ userID: userID, rate: number });
    }
  });
}

// 3b: Create a function called averageRating which calculate the average rating of a product
function averageRating(productId) {
  let a = 0;
  let i = 0;
  products.map((value) => {
    if (value._id === productId) {
      value.ratings.map((valueProduct) => {
        a += valueProduct.rate;
        i++;
      });
    }
  });
  let res = 0;
  res = a / i;
  return res;
}

// 4: Create a function called likeProduct. This function will helps to like to the product if it is not liked and remove like if it was liked.
function likeProduct(productId, userId) {
  products.map((value) => {
    if (value._id === productId) {
      value.likes.map((valueLike, key) => {
        if (valueLike === userId) {
          value.likes.splice(key, 1);
        } else {
          value.likes.push(userId);
        }
      });
    }
  });
}
