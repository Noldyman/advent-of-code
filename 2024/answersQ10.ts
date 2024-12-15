import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ10.txt", "utf-8");

type Coordinate = [number, number];

const formatInput = () => {
  return input
    .split("\n")
    .filter((line) => !!line)
    .map((line) => line.split("").map(Number));
};

const countTrailHeadScores = (rows: number[][]) => {
  let sum = 0;
  let distinctSum = 0;
  const lastXIndex = rows[0].length - 1;
  const lastYIndex = rows.length - 1;
  const startingpoints: Coordinate[] = [];
  rows.forEach((row, yIndex) => {
    row.forEach((tile, xIndex) => {
      if (tile === 0) {
        startingpoints.push([xIndex, yIndex]);
      }
    });
  });

  for (const startingPoint of startingpoints) {
    const nineIndexes: string[] = [];
    const [xIndex, yIndex] = startingPoint;
    const initialPoints: Coordinate[] = [
      [xIndex, yIndex - 1],
      [xIndex + 1, yIndex],
      [xIndex, yIndex + 1],
      [xIndex - 1, yIndex],
    ];
    let pointsToCheck = initialPoints.filter(
      ([x, y]) =>
        x >= 0 &&
        x <= lastXIndex &&
        y >= 0 &&
        y <= lastYIndex &&
        rows[y][x] === 1
    );

    while (pointsToCheck.length > 0) {
      const newPointsToCheck: Coordinate[] = [];

      for (const point of pointsToCheck) {
        const [newXIndex, newYIndex] = point;
        const lastValue = rows[newYIndex][newXIndex];
        if (lastValue === 9) {
          distinctSum += 1;
          const coordString = newYIndex + ";" + newXIndex;
          if (!nineIndexes.includes(coordString)) {
            nineIndexes.push(coordString);
          }
          continue;
        }

        const newPoints: Coordinate[] = [
          [newXIndex, newYIndex - 1],
          [newXIndex + 1, newYIndex],
          [newXIndex, newYIndex + 1],
          [newXIndex - 1, newYIndex],
        ];
        newPointsToCheck.push(
          ...newPoints.filter(
            ([x, y]) =>
              x >= 0 &&
              x <= lastXIndex &&
              y >= 0 &&
              y <= lastYIndex &&
              rows[y][x] === lastValue + 1
          )
        );
      }
      pointsToCheck = newPointsToCheck;
    }
    sum += nineIndexes.length;
  }

  return { sum, distinctSum };
};

const formattedInput = formatInput();
const { sum, distinctSum } = countTrailHeadScores(formattedInput);
console.log(`Answer to Q10A: ${sum}`);
console.log(`Answer to Q10B: ${distinctSum}`);
