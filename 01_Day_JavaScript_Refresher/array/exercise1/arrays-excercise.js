/*-----  ARRAY Exercise: Level 1 -----*/

// Level 1-1: Declare an empty array
const e11 = [];

// Level 1-2: Declare an array with more than 5 number of elements
const e12 = [
  "undefined",
  "null",
  "Boolean",
  "Number",
  "BigInt",
  "String",
  "Symbol",
];

// Level 1-3: Find the length of your array
const e13 = e12.length;

// Level 1-4: Get the first item, the middle item and the last item of the array
const e14a = e12[0];
const e14b = e12[Math.floor(e13 / 2)];
const e14c = e12[e12.length - 1];
//console.log(e14c);

// Level 1-5: Declare an array called mixedDataTypes, put different data types in the array and find the length of the array. The array size should be greater than 5
const mixedDataTypes = ["string", 5, 8, 9, true, function () {}, null];
const mixedDataTypesLength = mixedDataTypes.length;

// Level 1-6: Declare an array variable name itCompanies and assign initial values Facebook, Google, Microsoft, Apple, IBM, Oracle and Amazon
const itCompanies = [
  "Facebook",
  "Google",
  "Microsoft",
  "Apple",
  "IBM",
  "Oracle",
  "Amazon",
];

// Level 1-7: Print the array using console.log()
//console.log(itCompanies);

// Level 1-8: Print the number of companies in the array
//console.log(itCompanies.length);

// Level 1-9: Print the first company, middle and last company
const firstItCompanies = itCompanies[0];
const middleItCompanies = itCompanies[Math.floor(e13 / 2)];
const lastItCompanies = itCompanies[itCompanies.length - 1];
//console.log(`${firstItCompanies} ${middleItCompanies} ${lastItCompanies}`);

// Level 1-10: Print out each company
for (const ele of itCompanies) {
  //console.log(ele);
}

// Level 1-11: Change each company name to uppercase one by one and print them out
for (const ele of itCompanies) {
  //console.log(ele.toUpperCase());
}

// Level 1-12: Print the array like as a sentence: Facebook, Google, Microsoft, Apple, IBM,Oracle and Amazon are big IT companies.
const e112a = itCompanies.join(", ");
const e112b = " are big IT companies.";
//console.log(e112a + e112b);

// Level 1-13: Check if a certain company exists in the itCompanies array. If it exist return the company else return a company is not found
const company = "Facebook";
if (itCompanies.includes(company)) {
  //console.log(company);
} else {
  //console.log(`${company} is not found`);
}

// Level 1-14: Filter out companies which have more than one 'o' without the filter method
const e114 = [];
const maxIndexOfItCompanies = itCompanies.length - 1;
for (let i = 0; i < maxIndexOfItCompanies; i++) {
  if (itCompanies[i].indexOf("o") !== itCompanies[i].lastIndexOf("o")) {
    e114.push(itCompanies[i]);
  }
}

// Level 1-15: Sort the array using sort() method
itCompanies.sort();

// Level 1-16: Reverse the array using reverse() method
itCompanies.reverse();

// Level 1-17: Slice out the first 3 companies from the array
const e117 = itCompanies.slice(0, 3);

// Level 1-18: Slice out the last 3 companies from the array
const startIndexE118 = maxIndexOfItCompanies - 3;
const e118 = itCompanies.slice(startIndexE118, maxIndexOfItCompanies);

// Level 1-19: Slice out the last 3 companies from the array
const middleIndexOfItCompaniesSubtractionOne =
  Math.floor(itCompanies.length / 2) - 1;
const endIndexOfE119 = middleIndexOfItCompaniesSubtractionOne + 3;
const e119 = itCompanies.slice(
  middleIndexOfItCompaniesSubtractionOne,
  endIndexOfE119
);

// Level 1-20: Remove the first IT company from the array
itCompanies.shift();

// Level 1-21: Remove the middle IT company or companies from the array
const middleIndexOfItCompanies = Math.floor(itCompanies.length / 2);
itCompanies.splice(middleIndexOfItCompanies, 1);

// Level 1-22: Remove the last IT company from the array
itCompanies.pop();

// Level 1-23: Remove all IT companies
const e123a = itCompanies.length;
for (let i = 0; i < e123a; i++) {
  itCompanies.shift();
}
