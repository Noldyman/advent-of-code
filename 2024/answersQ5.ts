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

const updateIsValid = (rules: [number, number][], update: number[]) => {
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
  return updateIsValid;
};

const addMiddlePageNumbers = (
  rules: [number, number][],
  updates: number[][]
) => {
  let sumOfValidMiddlePages = 0;
  let sumOfReOrderedMiddlePages = 0;

  const invalidUpdates: number[][] = [];

  for (const update of updates) {
    if (updateIsValid(rules, update)) {
      sumOfValidMiddlePages += update[(update.length - 1) / 2];
    } else {
      invalidUpdates.push(update);
    }
  }

  for (const invalidUpdate of invalidUpdates) {
    let newUpdate: number[] = [...invalidUpdate];
    let isValid = false;

    while (!isValid) {
      for (let i = 1; i < newUpdate.length; i++) {
        const current = newUpdate[i];
        const invalidPrevious = rules
          .filter((f) => f[0] === current)
          .map((f) => f[1]);

        const firstRuleIndex = newUpdate.findIndex((p) =>
          invalidPrevious.includes(p)
        );

        if (firstRuleIndex >= 0 && firstRuleIndex < i) {
          const updateBuild: number[] = [];
          newUpdate.forEach((curr, ind) => {
            if (ind === firstRuleIndex) {
              updateBuild.push(current);
              updateBuild.push(curr);
            } else if (ind !== i) {
              updateBuild.push(curr);
            }
          });
          newUpdate = updateBuild;
        }
      }
      isValid = updateIsValid(rules, newUpdate);
    }

    sumOfReOrderedMiddlePages += newUpdate[(newUpdate.length - 1) / 2];
  }

  return { sumOfValidMiddlePages, sumOfReOrderedMiddlePages };
};

const { rules, updates } = formatInput();
const { sumOfValidMiddlePages, sumOfReOrderedMiddlePages } =
  addMiddlePageNumbers(rules, updates);
console.log(`Answer to Q5A: ${sumOfValidMiddlePages}`);
console.log(`Answer to Q5B: ${sumOfReOrderedMiddlePages}`);
