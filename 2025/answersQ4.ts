import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ4.txt", "utf-8");
const rows = input
  .split("\n")
  .filter((c) => !!c)
  .map((c) => c.split(""));

let lastCopy = [...rows.map((r) => [...r])];
let newCopy = [...rows.map((r) => [...r])];

const countAndRemoveAvailableRolls = () => {
  let count = 0;
  const columnLength = lastCopy.length;
  const rowLength = lastCopy[0].length;

  for (let i = 0; i < columnLength; i++) {
    const row = lastCopy[i];

    for (let y = 0; y < rowLength; y++) {
      let adjecentRollsCount = 0;
      if (row[y] !== "@") {
        continue;
      }

      if (row[y - 1] === "@") {
        adjecentRollsCount += 1;
      }
      if (row[y + 1] === "@") {
        adjecentRollsCount += 1;
      }
      if (lastCopy[i - 1]?.[y] === "@") {
        adjecentRollsCount += 1;
      }
      if (lastCopy[i - 1]?.[y - 1] === "@") {
        adjecentRollsCount += 1;
      }
      if (lastCopy[i - 1]?.[y + 1] === "@") {
        adjecentRollsCount += 1;
      }
      if (lastCopy[i + 1]?.[y] === "@") {
        adjecentRollsCount += 1;
      }
      if (lastCopy[i + 1]?.[y - 1] === "@") {
        adjecentRollsCount += 1;
      }
      if (lastCopy[i + 1]?.[y + 1] === "@") {
        adjecentRollsCount += 1;
      }

      if (adjecentRollsCount < 4) {
        count += 1;
        newCopy[i][y] = ".";
      }
    }
  }

  lastCopy = [...newCopy.map((r) => [...r])];
  return count;
};

const countTotalRemovable = () => {
  let firstRoundCount = 0;
  let totalCount = 0;
  let isDone = false;
  while (!isDone) {
    const newCount = countAndRemoveAvailableRolls();
    if (!firstRoundCount) {
      firstRoundCount = newCount;
    }
    if (newCount === 0) {
      isDone = true;
    }
    totalCount += newCount;
  }
  return { firstRoundCount, totalCount };
};

const { firstRoundCount, totalCount } = countTotalRemovable();

console.log("Answer to 2025 Q4 A", firstRoundCount);
console.log("Answer to 2025 Q4 B", totalCount);
