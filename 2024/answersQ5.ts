import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ5.txt", "utf-8");

const formatInput = () => {
  const [rawRules, rawUpdates] = input.split("\n\n");
  const rules = rawRules
    .split("\n")
    .map((line) => line.split("|").map(Number)) as [number, number][];
  const updates = rawUpdates
    .split("\n")
    .filter((line) => !!line)
    .map((line) => line.split(",").map(Number)) as number[][];
  return { rules, updates };
};

const addValidMiddlePageNumbers = (
  rules: [number, number][],
  updates: number[][]
) => {
  let sumOfValidMiddlePages = 0;

  for (const update of updates) {
    let updateIsValid = true;
    outer: for (let i = 1; i < update.length; i++) {
      const current = update[i];
      const invalidPrevious = rules
        .filter((f) => f[0] === current)
        .map((f) => f[1]);

      for (let ind = 0; ind < i; ind++) {
        if (invalidPrevious.includes(update[ind])) {
          updateIsValid = false;
          break outer;
        }
      }
    }
    if (updateIsValid) {
      sumOfValidMiddlePages += update[(update.length - 1) / 2];
    }
  }

  return sumOfValidMiddlePages;
};

const { rules, updates } = formatInput();
console.log(`Answer to Q5A: ${addValidMiddlePageNumbers(rules, updates)}`);
