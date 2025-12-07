import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ6.txt", "utf-8");

type Operation = "*" | "+";

const formatInput = () => {
  const cleanNumbers: number[][] = [];
  let operations: Operation[] = [];

  const lines = input.split("\n").filter((line) => !!line);
  const formattedInput = lines.map((line) =>
    line.split(/[ \t]+/).filter((item) => !!item)
  );

  formattedInput.forEach((row, index) => {
    if (index === formattedInput.length - 1) {
      operations = [...(row as Operation[])];
    } else {
      cleanNumbers.push(row.map(Number));
    }
  });

  const fullLines: string[][] = [];

  lines.forEach((line, index) => {
    if (index !== formattedInput.length - 1) {
      fullLines.push(line.split(""));
    }
  });

  return { cleanNumbers, fullLines, operations };
};

const getGrandTotal = (cleanNumbers: number[][], operations: Operation[]) => {
  let grandTotal = 0;
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    let total = cleanNumbers[0][i];

    for (let y = 1; y < cleanNumbers.length; y++) {
      if (operation === "*") {
        total *= cleanNumbers[y][i];
      } else {
        total += cleanNumbers[y][i];
      }
    }
    grandTotal += total;
  }
  return grandTotal;
};

const getCephalopodTotal = (fullLines: string[][], operations: Operation[]) => {
  let total = 0;
  let operationIndex = operations.length - 1;
  let subTotal = 0;

  for (let i = fullLines[0].length - 1; i >= 0; i--) {
    let verticalString = fullLines[0][i];

    for (let y = 1; y < fullLines.length; y++) {
      verticalString += fullLines[y][i];
    }

    const trimmedString = verticalString.trim();

    if (!trimmedString) {
      total += subTotal;
      subTotal = 0;
      operationIndex -= 1;
      continue;
    }

    const number = parseInt(trimmedString);
    if (!subTotal) {
      subTotal = number;
    } else {
      if (operations[operationIndex] === "*") {
        subTotal *= number;
      } else {
        subTotal += number;
      }
      if (i === 0) {
        total += subTotal;
      }
    }
  }

  return total;
};

const { cleanNumbers, fullLines, operations } = formatInput();
console.log("Answer to QA:", getGrandTotal(cleanNumbers, operations));
console.log("Answer to QB:", getCephalopodTotal(fullLines, operations));
