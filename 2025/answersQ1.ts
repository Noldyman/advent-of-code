import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ1.txt", "utf-8");

type Direction = "L" | "R";
type Rotation = {
  direction: Direction;
  distance: number;
};
const rotations: Rotation[] = input
  .split("\n")
  .filter((line) => !!line)
  .map((line) => ({
    direction: line[0] as Direction,
    distance: parseInt(line.slice(1)),
  }));

const countZeroPointers = () => {
  let zeroPointers = 0;
  let position = 50;

  for (const rotation of rotations) {
    const remainingDistance = rotation.distance % 100;

    if (rotation.direction === "L") {
      const virtualPosition = position - remainingDistance;
      if (virtualPosition < 0) {
        position = 100 + virtualPosition;
        continue;
      }
      position = virtualPosition;
    } else {
      const virtualPosition = position + remainingDistance;
      if (virtualPosition > 99) {
        position = virtualPosition - 100;
        if (position === 0) {
          zeroPointers += 1;
        }
        continue;
      }
      position = virtualPosition;
    }
    if (position === 0) {
      zeroPointers += 1;
    }
  }

  return zeroPointers;
};

const countZeroPasses = () => {
  let zeroPasses = 0;
  let position = 50;

  for (const rotation of rotations) {
    const numOfFullCircles = Math.floor(rotation.distance / 100);
    zeroPasses += numOfFullCircles;

    const remainingDistance = rotation.distance % 100;

    if (rotation.direction === "L") {
      const virtualPosition = position - remainingDistance;
      if (virtualPosition <= 0) {
        if (position !== 0) {
          zeroPasses += 1;
        }
        if (virtualPosition < 0) {
          position = 100 + virtualPosition;
          continue;
        }
      }
      position = virtualPosition;
    } else {
      const virtualPosition = position + remainingDistance;
      if (virtualPosition > 99) {
        zeroPasses += 1;
        position = virtualPosition - 100;
        continue;
      }
      position = virtualPosition;
    }
  }

  return zeroPasses;
};

console.log("Answer Q1A:", countZeroPointers());
console.log("Answer Q1B:", countZeroPasses());
