const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ4.txt", "utf-8");
const assignmentPairs = input
  .split("\n")
  .map((line) =>
    line.split(",").map((assignment) => assignment.split("-").map(Number))
  );

const countFullOverlaps = () => {
  let count = 0;

  assignmentPairs.forEach((pair) => {
    const range1 = pair[0][1] - pair[0][0];
    const range2 = pair[1][1] - pair[1][0];

    if (range1 === range2) {
      if (pair[0][0] === pair[1][0]) count += 1;
    } else {
      let smallestAssignment = [];
      let biggestAssignment = [];
      if (range1 < range2) {
        smallestAssignment = [...pair[0]];
        biggestAssignment = [...pair[1]];
      } else {
        smallestAssignment = [...pair[1]];
        biggestAssignment = [...pair[0]];
      }

      if (
        smallestAssignment[0] >= biggestAssignment[0] &&
        smallestAssignment[1] <= biggestAssignment[1]
      ) {
        count += 1;
      }
    }
  });

  return count;
};

const countOverlaps = () => {
  let count = 0;

  assignmentPairs.forEach((pair) => {
    if (
      !(pair[0][0] < pair[1][0] && pair[0][1] < pair[1][0]) &&
      !(pair[0][0] > pair[1][1] && pair[0][1] > pair[1][1])
    ) {
      count += 1;
    }
  });

  return count;
};

console.log("Answer to Q4a:", countFullOverlaps());
console.log("Answer to Q4b:", countOverlaps());
