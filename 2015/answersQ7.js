const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ7.txt").toString().split("\n");
let instructions = {};
input
  .map((c) => c.split(" -> "))
  .forEach((i) => {
    const instruction = i[0].split(" ");
    if (instructions.length === 1) {
      instructions[i[1]] = parseInt(instruction);
    } else {
      instructions[i[1]] = instruction;
    }
  });

const numOfBits = 16;
let signals = {};

const convertToBinary = (number) => {
  const binary = (number >>> 0).toString(2);
  const emptyBits = "0".repeat(numOfBits - binary.length);
  return emptyBits + binary;
};

const convertToNumber = (binary) => {
  let number = 0;
  for (let i = numOfBits - 1; i >= 0; i -= 1) {
    const power = Math.abs(i - numOfBits + 1);
    if (binary[i] === "1") {
      number += Math.pow(2, power);
    }
  }
  return number;
};

const gates = {
  AND: (inputA, inputB) => {
    let output = "";
    for (let i = 0; i < numOfBits; i++) {
      if (inputA[i] === "1" && inputB[i] === "1") {
        output += "1";
      } else {
        output += "0";
      }
    }
    return output;
  },
  OR: (inputA, inputB) => {
    let output = "";
    for (let i = 0; i < numOfBits; i++) {
      if (inputA[i] === "1" || inputB[i] === "1") {
        output += "1";
      } else {
        output += "0";
      }
    }
    return output;
  },
  LSHIFT: (input, shift) => input.slice(shift) + "0".repeat(shift),
  RSHIFT: (input, shift) => "0".repeat(shift) + input.slice(0, -shift),
  NOT: (input) => {
    let output = "";
    for (let i = 0; i < numOfBits; i++) {
      if (input[i] === "0") {
        output += "1";
      } else {
        output += "0";
      }
    }
    return output;
  },
};

const getValue = (input) => {
  if (signals[input]) {
    return signals[input];
  } else if (!isNaN(parseInt(input))) {
    return convertToBinary(parseInt(input));
  }
  return null;
};

const solveWire = (wireToSolve) => {
  while (!signals[wireToSolve]) {
    for (const wire in instructions) {
      instruction = instructions[wire];
      if (signals[wire]) continue;

      if (instruction.length === 1) {
        signals[wire] = getValue(instruction[0]);
      } else if (instruction.includes("AND")) {
        const inputA = getValue(instruction[0]);
        const inputB = getValue(instruction[2]);
        if (inputA && inputB) {
          signals[wire] = gates.AND(inputA, inputB);
        }
      } else if (instruction.includes("OR")) {
        const inputA = getValue(instruction[0]);
        const inputB = getValue(instruction[2]);
        if (inputA && inputB) {
          signals[wire] = gates.OR(inputA, inputB);
        }
      } else if (instruction.includes("LSHIFT")) {
        const input = getValue(instruction[0]);
        const shift = parseInt(instruction[2]);
        if (input) {
          signals[wire] = gates.LSHIFT(input, shift);
        }
      } else if (instruction.includes("RSHIFT")) {
        const input = getValue(instruction[0]);
        const shift = parseInt(instruction[2]);
        if (input) {
          signals[wire] = gates.RSHIFT(input, shift);
        }
      } else {
        const input = getValue(instruction[1]);
        if (input) {
          signals[wire] = gates.NOT(input);
        }
      }
    }
  }
  return signals[wireToSolve];
};

const binaryOfA = solveWire("a");
console.log("Answer to 2015.Q7a: ", convertToNumber(binaryOfA));
signals = { b: binaryOfA };
console.log("Answer to 2015.Q7b: ", convertToNumber(solveWire("a")));
