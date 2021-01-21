/* ----- Exercises: Level 1 ----- */
/*
Create an empty object called dog
Print the the dog object on the console
Add name, legs, color, age and bark properties for the dog object. The bark property is a method which return woof woof
Get name, legs, color, age and bark value from the dog object
Set new properties the dog object: breed, getDogInfo
*/

let dog = {};

console.log(dog);

dog.name = "ali";
dog.legs = 4;
dog.color = "brown";
dog.bark = () => "woof woof";

console.log(`${dog.name} - ${dog.legs} - ${dog.color} - ${dog.bark()}`);

dog.breed = "poodle";
dog.getDogInfo = function () {
  return `${this.name} - ${this.legs} - ${this.color} - ${this.bark()} - ${
    this.breed
  }`;
};

console.log(dog.getDogInfo());
