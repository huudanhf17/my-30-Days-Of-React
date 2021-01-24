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
  (product) => typeof product.price === "number",
);
