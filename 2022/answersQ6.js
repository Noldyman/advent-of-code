const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ6.txt", "utf-8");

const getMarkerLocation = (numOfDistinctChar) => {
  for (let i = numOfDistinctChar - 1; i < input.length; i++) {
    let testString = "";
    for (let ind = numOfDistinctChar; ind > 0; ind--) {
      testString += input[i - (ind - 1)];
    }

    let containsDuplicates = false;
    for (let index = 0; index < testString.length; index++) {
      const firstIndex = testString.indexOf(testString[index]);
      const lastIndex = testString.lastIndexOf(testString[index]);
      if (firstIndex !== lastIndex) {
        containsDuplicates = true;
        break;
      }
    }
    if (!containsDuplicates) {
      return i + 1;
    }
  }
};

console.log("Answer to Q6a:", getMarkerLocation(4));
console.log("Answer to Q6b:", getMarkerLocation(14));
