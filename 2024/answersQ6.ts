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

  return { lines, initialPosition };
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
const createPath = (initialPosition: string, lines: string[]) => {
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

  let currPosition = initialPosition.split(";").map(Number) as [number, number];
  while (!hasReachedEnd) {
    const positionString = currPosition.join(";");
    visitedPositions.push(positionString);
    if (!uniqueVisitedPositions.includes(positionString)) {
      uniqueVisitedPositions.push(positionString);
    }

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

    while (nextTile === "#") {
      direction = newDirectionMap[direction];
      nextPosition = getNextPosition(currPosition, direction);
      nextTile = lines[nextPosition[1]][nextPosition[0]];
    }
    currPosition = nextPosition;
  }
  return { visitedPositions, uniqueVisitedPositions };
};

const { lines, initialPosition } = formatInput();
const { visitedPositions, uniqueVisitedPositions } = createPath(
  initialPosition,
  lines
);
console.log(`Answer to Q6A: ${uniqueVisitedPositions.length}`);
