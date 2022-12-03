const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ2.txt", "utf-8");
const rpsRounds = input.split("\n").map((round) => round.split(" "));

const pointsForShape = {
  X: 1,
  Y: 2,
  Z: 3,
};

const calculateScoreRoundStrategy1 = (round) => {
  let points = pointsForShape[round[1]];
  switch (round[0]) {
    case "A":
      switch (round[1]) {
        case "X":
          points += 3;
          break;
        case "Y":
          points += 6;
          break;
      }
      break;
    case "B":
      switch (round[1]) {
        case "Y":
          points += 3;
          break;
        case "Z":
          points += 6;
          break;
      }
      break;
    case "C":
      switch (round[1]) {
        case "Z":
          points += 3;
          break;
        case "X":
          points += 6;
          break;
      }
      break;
  }
  return points;
};

const caculateTotalScoreStrategy1 = () => {
  let totalScore = 0;

  rpsRounds.forEach((round) => {
    totalScore += calculateScoreRoundStrategy1(round);
  });

  return totalScore;
};

const calculateScoreRoundStrategy2 = (round) => {
  let points = 0;
  const countershapes = {
    A: ["Y", "X", "Z"],
    B: ["Z", "Y", "X"],
    C: ["X", "Z", "Y"],
  };

  switch (round[1]) {
    case "X":
      points += pointsForShape[countershapes[round[0]][2]];
      break;
    case "Y":
      points += 3;
      points += pointsForShape[countershapes[round[0]][1]];
      break;
    case "Z":
      points += 6;
      points += pointsForShape[countershapes[round[0]][0]];
      break;
  }
  return points;
};

const caculateTotalScoreStrategy2 = () => {
  let totalScore = 0;

  rpsRounds.forEach((round) => {
    totalScore += calculateScoreRoundStrategy2(round);
  });

  return totalScore;
};

console.log("Answer to Q2a:", caculateTotalScoreStrategy1());
console.log("Answer to Q2b:", caculateTotalScoreStrategy2());
