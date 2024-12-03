const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ1.txt", "utf-8");

const formatInput = () => {
  const lines = input.split("\n");
  const leftColumn = [];
  const rightColumn = [];

  lines.forEach((line) => {
    if (line) {
      const splitLine = line.split("   ");
      leftColumn.push(parseInt(splitLine[0]));
      rightColumn.push(parseInt(splitLine[1]));
    }
  });

  return {
    leftColumn: leftColumn.sort((a, b) => a - b),
    rightColumn: rightColumn.sort((a, b) => a - b),
  };
};

const countTotalDistance = (leftColumn, rightColumn) => {
  let totalDistance = 0;

  for (let i = 0; i < leftColumn.length; i++) {
    totalDistance += Math.abs(leftColumn[i] - rightColumn[i]);
  }
  return totalDistance;
};

const getSimilarity = (leftColumn, rightColumn) => {
  let similarityScore = 0;
  leftColumn.forEach((number) => {
    const countInRightColumn = rightColumn.filter(
      (num) => num === number
    ).length;
    similarityScore += number * countInRightColumn;
  });
  return similarityScore;
};

const { leftColumn, rightColumn } = formatInput();
console.log(`Answer Q1A: ${countTotalDistance(leftColumn, rightColumn)}`);
console.log(`Answer Q1B: ${getSimilarity(leftColumn, rightColumn)}`);
