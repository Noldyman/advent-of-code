const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ3.txt", "utf-8");

const getSumOfMultiplications = () => {
  let sum = 0;
  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = [...input.matchAll(mulRegex)].map((match) => match[0]);
  matches.forEach((match) => {
    const digits = [...match.matchAll(/\d{1,3}/g)].map((match) =>
      Number(match[0])
    );
    sum += digits[0] * digits[1];
  });
  return sum;
};

const getAccurateSumOfMultiplications = () => {
  let sum = 0;
  const regex = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g;
  const matches = [...input.matchAll(regex)].map((match) => match[0]);

  let isEnabled = true;
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    if (match === "do()") {
      isEnabled = true;
      continue;
    } else if (match === "don't()") {
      isEnabled = false;
      continue;
    }
    if (!isEnabled) {
      continue;
    }
    const digits = [...match.matchAll(/\d{1,3}/g)].map((match) =>
      Number(match[0])
    );
    sum += digits[0] * digits[1];
  }
  return sum;
};

console.log(`Answer to Q1A: ${getSumOfMultiplications()}`);
console.log(`Answer to Q1B: ${getAccurateSumOfMultiplications()}`);
