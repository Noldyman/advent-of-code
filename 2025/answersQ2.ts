import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ2.txt", "utf-8");
const ranges: [number, number][] = input
  .split(",")
  .map((r) => r.split("-").map(Number) as [number, number]);

const getSumOfDoubles = () => {
  let sum = 0;

  for (const range of ranges) {
    for (let curr = range[0]; curr <= range[1]; curr++) {
      const numString = curr.toString();
      const numLength = numString.length;
      if (numLength % 2 !== 0) {
        continue;
      }

      const halfIndex = numLength / 2;
      const firstHalf = numString.slice(0, halfIndex);
      const secondHalf = numString.slice(halfIndex, numLength);

      if (firstHalf === secondHalf) {
        sum += curr;
      }
    }
  }
  return sum;
};

const getSumOfRepeatingSequences = () => {
  let sum = 0;

  for (const range of ranges) {
    outerLoop: for (let curr = range[0]; curr <= range[1]; curr++) {
      const numString = curr.toString();
      if (numString.length === 1) {
        continue;
      }
      let sequence = "";
      for (let i = 0; i < numString.length / 2; i++) {
        sequence += numString[i];
        let virtualString = sequence;
        while (virtualString.length < numString.length) {
          virtualString += sequence;
        }

        if (virtualString === numString) {
          sum += curr;
          continue outerLoop;
        }
      }
    }
  }
  return sum;
};

console.log("Answer to Q2A:", getSumOfDoubles());
console.log("Answer to Q2B:", getSumOfRepeatingSequences());
