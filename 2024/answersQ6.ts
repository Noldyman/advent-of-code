import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ6.txt", "utf-8");

const formatInput = () => {
  const lines = input.split("\n").filter((l) => !!l);
  let initialPosition = "";

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/(\^)/);
    if (match) {
      initialPosition = `${match.index};${i}`;
      break;
    }
  }
  const linesWithAddedObsticle: string[][] = [];
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (["#", "^"].includes(lines[y][x])) {
        continue;
      }
      linesWithAddedObsticle.push(
        lines.map((line, index) => {
          if (index === y) {
            return line.slice(0, x) + "0" + line.slice(x + 1);
          }
          return line;
        })
      );
    }
  }

  return { initialPosition, lines, linesWithAddedObsticle };
};

const getNextPosition = (
  currPosition: [number, number],
  direction
): [number, number] => {
  switch (direction) {
    case "up":
      return [currPosition[0], currPosition[1] - 1];
    case "right":
      return [currPosition[0] + 1, currPosition[1]];
    case "down":
      return [currPosition[0], currPosition[1] + 1];
    default:
      return [currPosition[0] - 1, currPosition[1]];
  }
};

type Direction = "up" | "right" | "down" | "left";
const createPath = (
  initialPosition: string,
  lines: string[],
  checkForLoops: boolean = false
) => {
  const visitedPositions: string[] = [];
  const uniqueVisitedPositions: string[] = [];
  let direction: Direction = "up";
  const newDirectionMap: { [k in Direction]: Direction } = {
    up: "right",
    right: "down",
    down: "left",
    left: "up",
  };
  const xEndIndex = lines[0].length - 1;
  const yEndIndex = lines.length - 1;
  let hasReachedEnd = false;
  let isLoop = false;

  let currPosition = initialPosition.split(";").map(Number) as [number, number];
  while (!hasReachedEnd && !isLoop) {
    const positionString = currPosition.join(";");
    if (!visitedPositions.includes(positionString)) {
      uniqueVisitedPositions.push(positionString);
    } else if (checkForLoops) {
      const duplicateIndexes = visitedPositions.reduce(
        (indexes: number[], item, index) => {
          if (item === positionString) {
            indexes.push(index);
          }
          return indexes;
        },
        []
      );
      if (duplicateIndexes.length >= 2) {
        const lastIndex = duplicateIndexes[duplicateIndexes.length - 1];
        const beforeLastIndex = duplicateIndexes[duplicateIndexes.length - 2];
        const lastPath = visitedPositions
          .slice(lastIndex + 1, visitedPositions.length)
          .join(",");
        const beforeLastPath = visitedPositions
          .slice(beforeLastIndex + 1, lastIndex)
          .join(",");

        if (lastPath === beforeLastPath) {
          isLoop = true;
          break;
        }
      }
    }
    visitedPositions.push(positionString);

    if (
      currPosition[0] === 0 ||
      currPosition[0] === xEndIndex ||
      currPosition[1] === 0 ||
      currPosition[1] === yEndIndex
    ) {
      hasReachedEnd = true;
      break;
    }

    let nextPosition = getNextPosition(currPosition, direction);
    let nextTile = lines[nextPosition[1]][nextPosition[0]];

    while (nextTile === "#" || nextTile === "0") {
      direction = newDirectionMap[direction];
      nextPosition = getNextPosition(currPosition, direction);
      nextTile = lines[nextPosition[1]][nextPosition[0]];
    }
    currPosition = nextPosition;
  }
  return { uniqueVisitedPositions, isLoop };
};

const countLoops = (
  initialPosition: string,
  linesWithAddedObsticle: string[][]
) => {
  let count = 0;
  let number = 1;
  let loopNr = 1;
  console.log("LENGTH", linesWithAddedObsticle.length);
  for (const lines of linesWithAddedObsticle) {
    // console.log("IN LOOP", loopNr);
    loopNr++;
    number += 1;
    const { isLoop } = createPath(initialPosition, lines, true);
    if (isLoop) {
      count += 1;
    }
  }
  return count;
};

const { initialPosition, lines, linesWithAddedObsticle } = formatInput();
const { uniqueVisitedPositions } = createPath(initialPosition, lines);
console.log(`Answer to Q6A: ${uniqueVisitedPositions.length}`);
console.log(
  `Answer to Q6B: ${countLoops(initialPosition, linesWithAddedObsticle)}`
);
