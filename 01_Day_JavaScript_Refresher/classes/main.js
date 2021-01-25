/*----- Exercises Level 1 ----- */
// 1: Create an Animal class. The class will have name, age, color, legs properties and create different methods
class Animal {
  constructor(name, age, color, legs) {
    (this.name = name),
      (this.age = age),
      (this.color = color),
      (this.legs = legs);
  }
  getName() {
    return this.name;
  }
}

// 2: Create a Dog and Cat child class from the Animal Class.
class Dog extends Animal {
  get speak() {
    return `Wolf wolf`;
  }
}

class Cat extends Animal {
  get speak() {
    return `Meow meow`;
  }
}

/*----- Exercises Level 2 ----- */
// Override the method you create in Animal class

class E2 extends Animal {
  getName() {
    return `abc`;
  }
}

/*----- Exercises Level 3 ----- */
/*
Let's try to develop a program which calculate measure of central tendency of a sample(mean, median, mode) and measure of variability(range, variance, standard deviation). In addition to those measures find the min, max, count, percentile, and frequency distribution of the sample. You can create a class called Statistics and create all the functions which do statistical calculations as method for the Statistics class. Check the output below.
*/
ages = [
  31,
  26,
  34,
  37,
  27,
  26,
  32,
  32,
  26,
  27,
  27,
  24,
  32,
  33,
  27,
  25,
  26,
  38,
  37,
  31,
  34,
  24,
  33,
  29,
  26,
];

class Statistics {
  constructor(array) {
    this.array = array;
  }
  count() {
    return this.array.length;
  }
  sum() {
    let sum = this.array.reduce((acc, age) => (acc += age), 0);
    return sum;
  }
  min() {
    let min = Math.min(...this.array);
    return min;
  }
  max() {
    let max = Math.max(...this.array);
    return max;
  }
  range() {
    let range = this.max() - this.min();
    return range;
  }
  mean() {
    let mean = this.sum() / this.count();
    return mean;
  }
  median() {
    this.array.sort();
    let median = this.array[Math.floor(this.array.length / 2)];
    return median;
  }
  mode() {
    let counts = {};
    this.array.forEach((e) => {
      if (!(e in counts)) {
        counts[e] = 1;
      } else {
        counts[e]++;
      }
    });
    let bestNumber;
    let bestCount = 0;
    Object.entries(counts).forEach((number) => {
      if (number[1] > bestCount) {
        bestCount = number[1];
        bestNumber = number[0];
      }
    });
    return { mode: bestNumber, count: bestCount };
  }
  var() {
    let tu = 0;
    this.array.forEach((number) => {
      tu += Math.pow(number - this.mean(), 2);
    });
    let vari = tu / this.array.length;
    return vari;
  }
  std() {
    let std = Math.sqrt(this.var(), 2);
    return std;
  }
}

let statistics = new Statistics(ages);
console.log("Count:", statistics.count()); // 25
console.log("Sum: ", statistics.sum()); // 744
console.log("Min: ", statistics.min()); // 24;
console.log("Max: ", statistics.max()); // 38
console.log("Range: ", statistics.range()); // 14
console.log("Mean: ", statistics.mean()); // 30
console.log("Median: ", statistics.median()); // 29
console.log("Mode: ", statistics.mode()); // {'mode': 26, 'count': 5}
console.log("Variance: ", statistics.var()); // 17.5
console.log("Standard Deviation: ", statistics.std()); // 4.2
// console.log('Frequency Distribution: ',statistics.freqDist()) // [(20.0, 26), (16.0, 27), (12.0, 32), (8.0, 37), (8.0, 34), (8.0, 33), (8.0, 31), (8.0, 24), (4.0, 38), (4.0, 29), (4.0, 25)]
