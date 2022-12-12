const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ10.txt", "utf-8").split("\n");

const checkAtCycle = [20, 60, 100, 140, 180, 220];

let crt = ["", "", "", "", "", ""];
let currentCrtRow = 0;

const calculateSumOfSignalStrenghts = (program, checkAtCycle) => {
  let sumOfSignalStrengths = 0;
  let cycle = 1;
  let xValue = 1;

  let i = 0;
  while (cycle <= 240) {
    const instruction =
      program[i].split(" ").length === 1
        ? "noop"
        : parseInt(program[i].split(" ")[1]);

    renderPixelOnCrt(cycle, xValue);
    cycle += 1;

    if (checkAtCycle.includes(cycle)) {
      sumOfSignalStrengths += xValue * cycle;
    }

    if (instruction !== "noop") {
      renderPixelOnCrt(cycle, xValue);
      xValue += instruction;
      cycle += 1;
      if (checkAtCycle.includes(cycle)) {
        sumOfSignalStrengths += xValue * cycle;
      }
    }

    i++;
  }

  return sumOfSignalStrengths;
};

const renderPixelOnCrt = (cycle, xValue) => {
  const pixelPosition = (cycle - 1) % 40;

  if (pixelPosition >= xValue - 1 && pixelPosition <= xValue + 1) {
    crt[currentCrtRow] += "#";
  } else {
    crt[currentCrtRow] += ".";
  }

  if (cycle < 240 && cycle % 40 === 0) {
    currentCrtRow += 1;
  }
};

console.log(
  "Answer to Q10a:",
  calculateSumOfSignalStrenghts(input, checkAtCycle)
);
console.log("Answer to Q10b:", crt);
