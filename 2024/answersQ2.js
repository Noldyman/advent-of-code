const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ2.txt", "utf-8");

const formatInput = () => {
  const formattedInput = [];
  const lines = input.split("\n");
  lines.forEach((line) => {
    if (line) {
      formattedInput.push(line.split(" ").map(Number));
    }
  });
  return formattedInput;
};

const getUnsafeDigitIndexes = (line) => {
  const increaseMisMatchIndexes = [];
  const decreaseMisMatchIndexes = [];
  const unSafeDigitIndexes = [];

  for (let i = 1; i < line.length; i++) {
    if (line[i] < line[i - 1]) {
      increaseMisMatchIndexes.push(i);
    }
    if (line[i] > line[i - 1]) {
      decreaseMisMatchIndexes.push(i);
    }

    const difference = Math.abs(line[i] - line[i - 1]);
    if (difference < 1 || difference > 3) {
      unSafeDigitIndexes.push(i);
    }
  }

  if (increaseMisMatchIndexes.length <= decreaseMisMatchIndexes.length) {
    return unSafeDigitIndexes.concat(increaseMisMatchIndexes);
  } else {
    return unSafeDigitIndexes.concat(decreaseMisMatchIndexes);
  }
};

const countSafeLines = (lines) => {
  let safeCount = 0;
  let safeCountWithDampener = 0;

  outerLoop: for (let i = 0; i < lines.length; i++) {
    const line = [...lines[i]];
    const unsafeDigitIndexes = getUnsafeDigitIndexes(line);

    if (unsafeDigitIndexes.length === 0) {
      safeCount += 1;
      safeCountWithDampener += 1;
    } else {
      for (let ind = 0; ind < line.length; ind++) {
        const newLine = [...line.slice(0, ind), ...line.slice(ind + 1)];

        const retryUnsafeDigitIndexes = getUnsafeDigitIndexes(newLine);
        if (retryUnsafeDigitIndexes.length === 0) {
          safeCountWithDampener += 1;
          continue outerLoop;
        }
      }
    }
  }

  return { safeCount, safeCountWithDampener };
};

const formattedInput = formatInput();
const { safeCount, safeCountWithDampener } = countSafeLines(formattedInput);
console.log(`Answer Q1A: ${safeCount}`);
console.log(`Answer Q1A: ${safeCountWithDampener}`);
