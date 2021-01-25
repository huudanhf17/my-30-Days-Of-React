const products = [
  { product: "banana", price: 3 },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: 8 },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

// 1: Print the price of each product using forEach
//products.forEach((value) => console.log(value.price));

// 2: Print the product items as follows using forEach
/*
The price of banana is 3 euros.
The price of mango is 6 euros.
The price of potato is unknown.
The price of avocado is 8 euros.
The price of coffee is 10 euros.
The price of tea is unknown.
*/
// products.forEach((value) => {
//   if (value.price === "" || value.price === " ") {
//     console.log(`The price of ${value.product} is unknown.`);
//   } else {
//     console.log(`The price of ${value.product} is ${value.price} euros.`);
//   }
// });

// 3: Calculate the sum of all the prices using forEach
let sum = 0;
products.forEach((product) => {
  if (typeof product.price === "number") {
    sum += product.price;
  }
});

// 4: Create an array of prices using map and store it in a variable prices
let prices = products.map((product) => product.price);

// 5: Filter products with prices
let filterWithPrices = products.filter(
  (product) => typeof product.price === "number"
);

// 6: Use method chaining to get the sum of the prices(map, filter, reduce)

let e6a = products.map((product) => product.price);
let e6b = e6a.filter((price) => typeof price === "number");
let e6c = e6b.reduce((acc, price) => (acc += price), 0);

// 7: Calculate the sum of all the prices using reduce only
let e7 = products.reduce((acc, product) => {
  if (typeof product.price === "number") {
    return (acc += product.price);
  } else {
    return (acc += 0);
  }
}, 0);

// 8: Find the first product which doesn't have a price value
let e8 = products.find((product) => typeof product.price !== "number");

// 9: Find the index of the first product which does not have price value
let e9 = products.findIndex((product) => typeof product.price !== "number");

// 10: Check if some products do not have a price value
let e10 = products.some((product) => typeof product.price !== "number");

// 11: Check if all the products have price value
let e11 = products.every((product) => typeof product.price === "number");

// 12: Explain the difference between forEach, map, filter and reduce
// 13: Explain the difference between filter, find and findIndex
// 14: Explain the difference between some and every
