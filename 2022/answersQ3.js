const { Console } = require("console");
const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ3.txt", "utf-8");
const ruckSacks = input
  .split("\n")
  .map((content) => [
    content.slice(0, content.length / 2),
    content.slice(content.length / 2, content.length),
  ]);

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let duplicateItems = [];
let badgeItems = [];

const getDuplicateItems = () => {
  ruckSacks.forEach((ruckSack) => {
    for (let i = 0; i < ruckSack[0].length; i++) {
      if (ruckSack[0].includes(ruckSack[1][i]))
        return duplicateItems.push(ruckSack[1][i]);
    }
  });
};

const getBadgeItems = () => {
  ruckSacks.forEach((ruckSack, index) => {
    if (index % 3 === 0) {
      const contentMember1 = ruckSack[0] + ruckSack[1];
      const contentMember2 = ruckSacks[index + 1][0] + ruckSacks[index + 1][1];
      const contentMember3 = ruckSacks[index + 2][0] + ruckSacks[index + 2][1];

      for (let i = 0; i < contentMember1.length; i++) {
        if (
          contentMember2.includes(contentMember1[i]) &&
          contentMember3.includes(contentMember1[i])
        )
          return badgeItems.push(contentMember1[i]);
      }
    }
  });
};

const getSumOfPrios = (itemsArr) => {
  let sum = 0;

  itemsArr.forEach((item) => {
    sum += alphabet.indexOf(item) + 1;
  });

  return sum;
};

for (let i = 0; i < 50; i++) {
  if (i % 3 === 0) {
    console.log(i);
  }
}

getDuplicateItems();
getBadgeItems();
console.log("Answer to Q3a:", getSumOfPrios(duplicateItems));
console.log("Answer to Q3b:", getSumOfPrios(badgeItems));
