import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ11.txt", "utf-8");

const formatInput = () => {
  return input
    .split(" ")
    .filter((stone) => !!stone)
    .map(Number);
};

const blink = (initialStones: number[]) => {
  const numberOfBlinks = 25;

  let stones = [...initialStones];
  let count = stones.length;
  for (let i = 0; i < numberOfBlinks; i++) {
    const newStones: number[] = [];
    stones.forEach((stone) => {
      if (stone === 0) {
        newStones.push(1);
      } else {
        const stoneStr = stone.toString();
        const length = stoneStr.length;
        if (length % 2 === 0) {
          newStones.push(parseInt(stoneStr.slice(0, length / 2)));
          newStones.push(parseInt(stoneStr.slice(length / 2)));
          count += 1;
        } else {
          newStones.push(stone * 2024);
        }
      }
    });
    stones = newStones;
  }
  return count;
};

const formattedInput = formatInput();
const count = blink(formattedInput);
console.log(`Answer to Q11A: ${count}`);
