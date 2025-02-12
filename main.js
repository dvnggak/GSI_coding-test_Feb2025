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

// Convert function
const convertToNumbers = (sentence) =>
  sentence
    .split("")
    .map((char) => dict[char] || char) // Ignore undefined characters
    .join(" ");

// Read input from console
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter text: ", (sentence) => {
  console.log(`Converted: ${convertToNumbers(sentence)}`);
  rl.close();
});
