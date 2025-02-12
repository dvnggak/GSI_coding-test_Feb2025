// Dictionary to store character-to-number mappings
const dict = {};
const reverseDict = {};

//  Upper case character mappings
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

//  Lowercase character mappings (Reverse order)
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

//  Space is 0
dict[" "] = "0";

//  Reverse dictionary mapping => Explaination : 0 => A, 1 => B, 2 => E, 3 => F, 4 => I, 5 => J, 6 => K, 7 => L, 8 => M, 9 => N
reverseDict["0"] = "A";
reverseDict["1"] = "B";
reverseDict["2"] = "E";
reverseDict["3"] = "F";
reverseDict["4"] = "I";
reverseDict["5"] = "J";
reverseDict["6"] = "K";
reverseDict["7"] = "L";
reverseDict["8"] = "M";
reverseDict["9"] = "N";

// Populate dictionaries
const populateDictionary = (mapping) => {
  mapping.forEach(([letters, num]) => {
    letters.forEach((letter) => {
      dict[letter] = num;
    });
  });
};

// Populate mappings
populateDictionary(uppercaseMapping);
populateDictionary(lowercaseMapping);

// Convert function => SOAL NO 1
const convertToNumbers = (sentence) =>
  sentence
    .split("")
    .map((char) => dict[char] || char)
    .join(" ");

//  Alternating Sum/Subtraction Function => SOAL NO 2
const alternatingSumSubtraction = (numbers) => {
  let total = parseInt(numbers[0], 10);

  for (let i = 1; i < numbers.length; i++) {
    const num = parseInt(numbers[i], 10);
    total = i % 2 === 1 ? total + num : total - num;
  }

  return total;
};

//  Break into sequence function
const breakIntoSequence = (num) => {
  let absNum = Math.abs(num);
  let sequence = [];
  let sum = 0;
  let i = 0;

  // Loop to add consecutive numbers
  while (sum + i <= absNum) {
    sum += i;
    sequence.push(i); // Push the number
    i++;
  }

  let remaining = absNum - sum; // Remaining number
  let j = 0;

  // Loop to add remaining number
  while (remaining > 0) {
    sequence.push(j);
    remaining -= j;

    if (j === 0) {
      j = 1; //  after 0, go to 1
    } else {
      j = 0; // after 1, go to 0
    }
  }

  return sequence;
};

//  Convert to letters function => SOAL NO 3
const convertToLetters = (num) => {
  const sequence = breakIntoSequence(num);
  return sequence.map((digit) => reverseDict[digit] || "A").join(" ");
};

//  Readline interface
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter text: ", (sentence) => {
  const converted = convertToNumbers(sentence);
  console.log(`~ CASE 1 ~ || Converted: ${converted}`);

  const numbers = converted.split(" ").map(Number);

  const result = alternatingSumSubtraction(numbers);
  console.log(`~ CASE 2 ~ || Alternating sum/subtraction: ${result}`);

  const convertedBack = convertToLetters(result);
  console.log(`~ CASE 3 ~ || Converted back: ${convertedBack}`);

  rl.close();
});
