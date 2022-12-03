const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ1.txt", "utf-8");
const elvesInventories = input
  .split("\n\n")
  .map((inventory) => inventory.split("\n").map(Number));

let totalCaloriesPerElf = [];

const calculateTotalCaloriesPerElf = () => {
  elvesInventories.forEach((inventory) => {
    let totalCalories = 0;
    inventory.forEach((calories) => (totalCalories += calories));
    totalCaloriesPerElf.push(totalCalories);
  });
};

calculateTotalCaloriesPerElf();
totalCaloriesPerElf.sort((b, a) => a - b);

console.log("Answer Q1a:", totalCaloriesPerElf[0]);
console.log(
  "Answer Q1b:",
  totalCaloriesPerElf[0] + totalCaloriesPerElf[1] + totalCaloriesPerElf[2]
);
