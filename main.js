// Dictionary to store character-to-number mappings
const dict = {};

//  uppercase mappings
const uppercaseMapping = [
  [["A"], "0"],
  [["B", "C", "D"], "1"],
  [["E"], "2"],
  [["F", "G", "H"], "3"],
  [["I"], "4"],
  [["J", "K", "L", "M", "N"], "5"],
  [["O"], "6"],
  [["P", "Q", "R", "S", "T"], "7"],
  [["U"], "8"],
  [["V", "W", "X", "Y", "Z"], "9"],
];

//  lowercase mappings (reverse order)
const lowercaseMapping = [
  [["a"], "9"],
  [["b", "c", "d"], "8"],
  [["e"], "7"],
  [["f", "g", "h"], "6"],
  [["i"], "5"],
  [["j", "k", "l", "m", "n"], "4"],
  [["o"], "3"],
  [["p", "q", "r", "s", "t"], "2"],
  [["u"], "1"],
  [["v", "w", "x", "y", "z"], "0"],
];

// Space is 0
dict[" "] = "0";

// Populate dictionary
uppercaseMapping.forEach(([letters, num]) => {
  letters.forEach((letter) => {
    dict[letter] = num;
  });
});

lowercaseMapping.forEach(([letters, num]) => {
  letters.forEach((letter) => {
    dict[letter] = num;
  });
});

// Convert function => SOAL NO 1
const convertToNumbers = (sentence) =>
  sentence
    .split("")
    .map((char) => dict[char] || char) // Ignore undefined characters
    .join(" ");

// Alternating Sum/Subtraction Function => SOAL NO 2
const alternatingSumSubtraction = (numbers) => {
  let total = parseInt(numbers[0], 10); // Start with the first number

  for (let i = 1; i < numbers.length; i++) {
    const num = parseInt(numbers[i], 10);
    total = i % 2 === 1 ? total + num : total - num; // Alternate: + for odd indexes, - for even
  }

  return total;
};

// Read input from console
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter text: ", (sentence) => {
  // Convert string to numbers
  const converted = convertToNumbers(sentence);
  console.log(`~ CASE 1 ~ || Converted: ${converted}`);

  // Convert string of numbers to array of numbers
  const numbers = converted.split(" ").map(Number);

  // Calculate alternating sum/subtraction
  const result = alternatingSumSubtraction(numbers);
  console.log(`~ CASE 2 ~ || Alternating sum/subtraction: ${result}`);

  rl.close();
});
