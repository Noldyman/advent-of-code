const fs = require("fs");
const inputArr = fs
  .readFileSync("./inputs/inputQ8.txt")
  .toString()
  .split("\n")
  .map((i) => i.trim());

let numOfCharOfCode = 0;
let numOfCharInMemory = 0;
let numOfEncodedCharOfCode = 0;

const countCharacters = (input) => {
  const inputWithoutQuotes = input.slice(1, -1);
  const backslashCount = (inputWithoutQuotes.match(/\\\\/g) || []).length;
  const doubleQuoteCount = (inputWithoutQuotes.match(/\\\"/g) || []).length;
  const acsiiCodeCount = (
    inputWithoutQuotes.match(/\\x[0-9a-f][0-9a-f]/g) || []
  ).length;

  numOfCharOfCode += input.length;
  numOfCharInMemory +=
    inputWithoutQuotes.length -
    backslashCount -
    doubleQuoteCount -
    acsiiCodeCount * 3;
  numOfEncodedCharOfCode +=
    input.length +
    4 +
    backslashCount * 2 +
    doubleQuoteCount * 2 +
    acsiiCodeCount;
};

const calculate = () => {
  inputArr.forEach((input) => {
    countCharacters(input);
  });
};

calculate();

console.log("Answer to 2015-Q8a:", numOfCharOfCode - numOfCharInMemory);
console.log("Answer to 2015-Q8b:", numOfEncodedCharOfCode - numOfCharOfCode);
