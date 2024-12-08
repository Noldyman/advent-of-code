import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ8.txt", "utf-8");

type Coordinate = [number, number];
type AntennaPositions = {
  [key: string]: Coordinate[];
};

const formatInput = () => {
  const lines = input.split("\n").filter((l) => !!l);
  const antennaPositions: AntennaPositions = {};
  const lastXIndex = lines[0].length - 1;
  const lastYIndex = lines.length - 1;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const curr = lines[y][x];
      if (curr !== ".") {
        antennaPositions[curr] = [...(antennaPositions[curr] ?? []), [x, y]];
      }
    }
  }

  return { antennaPositions, lastXIndex, lastYIndex };
};

const isWithinBounds = (
  newPos: Coordinate,
  lastXIndex: number,
  lastYIndex: number
) => {
  return (
    newPos[0] >= 0 &&
    newPos[0] <= lastXIndex &&
    newPos[1] >= 0 &&
    newPos[1] <= lastYIndex
  );
};

const countUniqueAntinodes = (
  antennaPositions: AntennaPositions,
  lastXIndex: number,
  lastYIndex: number
) => {
  const antennas = Object.keys(antennaPositions);
  let uniqueAntennaPositions: string[] = [];
  let uniqueGridAntennaPositions: string[] = [];

  for (const antenna of antennas) {
    if (antennaPositions[antenna].length > 1) {
      antennaPositions[antenna].forEach((ant) =>
        uniqueGridAntennaPositions.push(ant.join(";"))
      );
    }
  }

  for (const antenna of antennas) {
    const positions = antennaPositions[antenna];
    positions.forEach((position, index) => {
      positions.forEach((innerPositon, innerIndex) => {
        if (index !== innerIndex) {
          const xDiff = position[0] - innerPositon[0];
          const yDiff = position[1] - innerPositon[1];
          const newPos: Coordinate = [position[0] + xDiff, position[1] + yDiff];

          if (isWithinBounds(newPos, lastXIndex, lastYIndex)) {
            const posStr = newPos.join(";");
            if (!uniqueAntennaPositions.includes(posStr)) {
              uniqueAntennaPositions.push(posStr);
            }
            if (!uniqueGridAntennaPositions.includes(posStr)) {
              uniqueGridAntennaPositions.push(posStr);
            }

            let newGridPos: Coordinate = [newPos[0] + xDiff, newPos[1] + yDiff];
            while (true) {
              if (!isWithinBounds(newGridPos, lastXIndex, lastYIndex)) {
                break;
              }
              const gridPosStr = newGridPos.join(";");
              if (!uniqueGridAntennaPositions.includes(gridPosStr)) {
                uniqueGridAntennaPositions.push(gridPosStr);
              }
              newGridPos = [newGridPos[0] + xDiff, newGridPos[1] + yDiff];
            }
          }
        }
      });
    });
  }
  console.log(uniqueGridAntennaPositions);
  return {
    uniqueAntennaCount: uniqueAntennaPositions.length,
    uniqueGridAntennaCount: uniqueGridAntennaPositions.length,
  };
};

const { antennaPositions, lastXIndex, lastYIndex } = formatInput();
const { uniqueAntennaCount, uniqueGridAntennaCount } = countUniqueAntinodes(
  antennaPositions,
  lastXIndex,
  lastYIndex
);
console.log(`Answer to Q8A: ${uniqueAntennaCount}`);
console.log(`Answer to Q8B: ${uniqueGridAntennaCount}`);
