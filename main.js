// Dictionary to store character-to-number mappings
const dict = {};
const reverseDict = {};

// Uppercase character mappings
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

// Lowercase character mappings (Reverse order)
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

// Reverse dictionary mapping
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
      // Add each letter to the dictionary, mapping to the number value
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

// Alternating Sum/Subtraction Function => SOAL NO 2
const alternatingSumSubtraction = (numbers) => {
  let total = parseInt(numbers[0], 10);

  for (let i = 1; i < numbers.length; i++) {
    const num = parseInt(numbers[i], 10);
    total = i % 2 === 1 ? total + num : total - num;
  }

  return total;
};

// Break into sequence function
const breakIntoSequence = (num) => {
  let absNum = Math.abs(num);
  let sequence = [];
  let sum = 0;
  let i = 0;

  // Loop to add consecutive numbers
  while (sum + i <= absNum) {
    sum += i;
    sequence.push(i);
    i++;
  }

  let remaining = absNum - sum;
  let j = 0;

  // Loop to add remaining number
  while (remaining > 0) {
    sequence.push(j);
    remaining -= j;

    // Toggle between 0 and 1, to add alternating numbers
    if (j === 0) {
      j = 1;
    } else {
      j = 0;
    }
  }

  return sequence;
};

// Convert to letters function => SOAL NO 3
const convertToLetters = (num) => {
  const sequence = breakIntoSequence(num);
  return sequence.map((digit) => reverseDict[digit] || "A").join(" "); // Convert numbers to letters
};

const convertLettersToNumbers = (letters) => {
  return letters.split(" ").map((char) => {
    return (
      Object.keys(reverseDict).find((key) => reverseDict[key] === char) || "0" // Convert letters to numbers
    );
  });
};

// Modify the second-last number and convert back => SOAL NO 4
const finalTransformation = (letterSequence) => {
  let numbers = convertLettersToNumbers(letterSequence);

  // Modify the second last number, 1 to the second last number
  if (numbers.length > 1) {
    let secondLastIndex = numbers.length - 2;

    // add 1 to the second last number if it is less than 9
    if (parseInt(numbers[secondLastIndex]) < 9) {
      numbers[secondLastIndex] = (
        parseInt(numbers[secondLastIndex]) + 1
      ).toString();
    }
  }

  // make the last number 'E' if it is not already
  let lastIndex = numbers.length - 1;
  if (reverseDict[numbers[lastIndex]] !== "E") {
    numbers[lastIndex] = "2"; // 2 => E
  }

  return numbers.map((num) => reverseDict[num] || "A").join(" ");
};

// Transform letters to numbers => SOAL NO 5
const transformLettersToNumbers = (letterSequence) => {
  let numbers = convertLettersToNumbers(letterSequence);

  let transformedNumbers = numbers.map((num) => {
    let newNum = parseInt(num);

    // Modify the number based on the rules
    if (newNum === 2) return 3; // E -> 3
    if (newNum === 4) return 5; // I -> 5
    if (newNum === 0) return 1; // A -> 1

    return newNum;
  });

  // Modify the last number, add 2 if it is less than 9
  let lastIndex = transformedNumbers.length - 1;
  if (lastIndex >= 0) {
    let lastNumber = parseInt(transformedNumbers[lastIndex]);

    if (lastNumber < 9) {
      transformedNumbers[lastIndex] = (lastNumber + 2).toString();
    }
  }

  return transformedNumbers.join(" ");
};

// Readline interface
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter text: ", (sentence) => {
  // Case 1: Convert text to numbers
  const converted = convertToNumbers(sentence);
  console.log(`~ CASE 1 ~ || Converted: ${converted}`);

  // Case 2: Alternating Sum/Subtraction
  const numbers = converted.split(" ").map(Number);
  const result = alternatingSumSubtraction(numbers);
  console.log(`~ CASE 2 ~ || Alternating sum/subtraction: ${result}`);

  // Case 3: Convert result back to letters
  const convertedBack = convertToLetters(result);
  console.log(`~ CASE 3 ~ || Converted back: ${convertedBack}`);

  // Case 4: Modify the second-last number and convert back
  const modified = finalTransformation(convertedBack);
  console.log(`~ CASE 4 ~ || Modified: ${modified}`);

  // Case 5: Transform letters to numbers
  const transformed = transformLettersToNumbers(convertedBack);
  console.log(`~ CASE 5 ~ || Transformed: ${transformed}`);

  rl.close();
});
