const fs = require("fs");
const input = fs
  .readFileSync("./inputs/inputQ9.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(" "));

const countUniquePositions = (instructions) => {
  let knotPositions = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  let uniqueTailPositions = [];
  let uniqueNinePositions = [];

  instructions.forEach((instr) => {
    const direction = instr[0];
    const numOfSteps = parseInt(instr[1]);

    let i = 0;
    while (i < numOfSteps) {
      switch (direction) {
        case "U":
          knotPositions[0][1] += 1;
          break;
        case "D":
          knotPositions[0][1] -= 1;
          break;
        case "L":
          knotPositions[0][0] -= 1;
          break;
        case "R":
          knotPositions[0][0] += 1;
          break;
      }

      for (let ind = 1; ind < knotPositions.length; ind++) {
        if (
          Math.abs(knotPositions[ind - 1][0] - knotPositions[ind][0]) > 1 ||
          Math.abs(knotPositions[ind - 1][1] - knotPositions[ind][1]) > 1
        ) {
          const xDifference = knotPositions[ind - 1][0] - knotPositions[ind][0];
          const yDifference = knotPositions[ind - 1][1] - knotPositions[ind][1];

          let newKnotPosition = [knotPositions[ind][0], knotPositions[ind][1]];

          if (xDifference > 1 && yDifference === 0) {
            newKnotPosition[0] = knotPositions[ind][0] + 1;
          } else if (xDifference < -1 && yDifference === 0) {
            newKnotPosition[0] = knotPositions[ind][0] - 1;
          } else if (yDifference > 1 && xDifference === 0) {
            newKnotPosition[1] = knotPositions[ind][1] + 1;
          } else if (yDifference < -1 && xDifference === 0) {
            newKnotPosition[1] = knotPositions[ind][1] - 1;
          } else if (xDifference > 1 && yDifference !== 0) {
            newKnotPosition[0] = knotPositions[ind][0] + 1;
            if (yDifference > 0) {
              newKnotPosition[1] = knotPositions[ind][1] + 1;
            } else {
              newKnotPosition[1] = knotPositions[ind][1] - 1;
            }
          } else if (xDifference < -1 && yDifference !== 0) {
            newKnotPosition[0] = knotPositions[ind][0] - 1;
            if (yDifference > 0) {
              newKnotPosition[1] = knotPositions[ind][1] + 1;
            } else {
              newKnotPosition[1] = knotPositions[ind][1] - 1;
            }
          } else if (yDifference > 1 && xDifference !== 0) {
            newKnotPosition[1] = knotPositions[ind][1] + 1;
            if (xDifference > 0) {
              newKnotPosition[0] = knotPositions[ind][0] + 1;
            } else {
              newKnotPosition[0] = knotPositions[ind][0] - 1;
            }
          } else {
            newKnotPosition[1] = knotPositions[ind][1] - 1;
            if (xDifference > 0) {
              newKnotPosition[0] = knotPositions[ind][0] + 1;
            } else {
              newKnotPosition[0] = knotPositions[ind][0] - 1;
            }
          }

          knotPositions[ind] = [...newKnotPosition];
        }
      }

      const currTailPosition = knotPositions[1].toString();
      if (!uniqueTailPositions.includes(currTailPosition))
        uniqueTailPositions.push(currTailPosition);
      const currNinePosition = knotPositions[9].toString();
      if (!uniqueNinePositions.includes(currNinePosition))
        uniqueNinePositions.push(currNinePosition);
      i++;
    }
  });

  return {
    numOfuniqueTailPositions: uniqueTailPositions.length,
    numOfuniqueNinePositions: uniqueNinePositions.length,
  };
};

const uniquePositions = countUniquePositions(input);

console.log("Answer to Q9a:", uniquePositions.numOfuniqueTailPositions);
console.log("Answer to Q9b:", uniquePositions.numOfuniqueNinePositions);
