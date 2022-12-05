const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ5.txt", "utf-8");
const splitInput = input.split("\n\n");
const crudeCrateArrangement = splitInput[0].split("\n");
const procedure = splitInput[1].split("\n").map((instr) =>
  instr
    .split(" ")
    .filter((item) => !isNaN(parseInt(item)))
    .map(Number)
);

let firstCrateArrangement = [];
let secondCrateArrangement = [];

const getInitialCrateArrangement = () => {
  let initialCrateArrangement = [];
  const numOfStacks = (crudeCrateArrangement[0].length + 1) / 4;

  for (let i = 0; i < numOfStacks; i++) {
    initialCrateArrangement.push([]);
  }

  crudeCrateArrangement.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "[") {
        let stackNumber = i === 0 ? 0 : i / 4;
        initialCrateArrangement[stackNumber].push(line[i + 1]);
        i += 3;
      }
    }
  });

  firstCrateArrangement = initialCrateArrangement.map((stack) =>
    stack.map((crate) => crate)
  );
  secondCrateArrangement = initialCrateArrangement.map((stack) =>
    stack.map((crate) => crate)
  );
};

const rearrangeCrates = () => {
  procedure.forEach((instruction) => {
    const amount = instruction[0];
    const fromStack = instruction[1] - 1;
    const toStack = instruction[2] - 1;

    for (let i = 0; i < amount; i++) {
      const crate = firstCrateArrangement[fromStack].shift();
      firstCrateArrangement[toStack].unshift(crate);
    }

    const crates = secondCrateArrangement[fromStack].splice(0, amount);
    console.log(crates);
    secondCrateArrangement[toStack].unshift(...crates);
  });
};

const getAllCratesOnTop = (crateArrangement) => {
  let topCrates = "";

  crateArrangement.forEach((stack) => {
    topCrates += stack[0];
  });

  return topCrates;
};

getInitialCrateArrangement();
rearrangeCrates();

console.log("Answer to Q5a:", getAllCratesOnTop(firstCrateArrangement));
console.log("Answer to Q5b:", getAllCratesOnTop(secondCrateArrangement));
