import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ4.txt", "utf-8");

const combineStrings = () => {
  const horizontalLines: string[] = input.split("\n").filter((l) => l);
  const verticalLines: string[] = [];
  const forwardDiagonalLines: string[] = [];
  const backwardDiagonalLines: string[] = [];
  const lastVertIndex = horizontalLines.length - 1;

  // Create vertical lines
  for (let vertInd = 0; vertInd < horizontalLines.length; vertInd++) {
    let currLine = "";
    horizontalLines.forEach((line, ind) => {
      currLine += line[vertInd];
    });
    verticalLines.push(currLine);
  }

  // Create forward diagonal lines
  for (let vertInd = 3; vertInd < horizontalLines.length; vertInd++) {
    let currLine = "";
    for (let horInd = 0; horInd < horizontalLines[vertInd].length; horInd++) {
      const horizontalLine = horizontalLines[vertInd - horInd];
      if (horizontalLine) {
        currLine += horizontalLine[horInd] ?? "";
      }
    }
    forwardDiagonalLines.push(currLine);
  }

  for (
    let horInd = 1;
    horInd < horizontalLines[lastVertIndex].length - 3;
    horInd++
  ) {
    let currBottomLine = "";
    for (
      let vertIndSubstr = 0;
      vertIndSubstr < horizontalLines[lastVertIndex].length - horInd;
      vertIndSubstr++
    ) {
      const bottomHorizontalLine =
        horizontalLines[lastVertIndex - vertIndSubstr];
      if (bottomHorizontalLine) {
        currBottomLine += bottomHorizontalLine[horInd + vertIndSubstr] ?? "";
      }
    }
    forwardDiagonalLines.push(currBottomLine);
  }

  // Create backward diagonal lines
  for (let vertInd = 0; vertInd < horizontalLines.length - 3; vertInd++) {
    let currLine = "";
    for (let horInd = 0; horInd < horizontalLines[vertInd].length; horInd++) {
      const horizontalLine = horizontalLines[vertInd + horInd];
      if (horizontalLine) {
        currLine += horizontalLine[horInd] ?? "";
      }
    }
    backwardDiagonalLines.push(currLine);
  }

  for (let horInd = 1; horInd < horizontalLines[0].length - 3; horInd++) {
    let currTopLine = "";
    for (
      let vertIndAdd = 0;
      vertIndAdd < horizontalLines[0].length - horInd;
      vertIndAdd++
    ) {
      const topHorizontalLine = horizontalLines[vertIndAdd];
      if (topHorizontalLine) {
        currTopLine += topHorizontalLine[horInd + vertIndAdd] ?? "";
      }
    }
    backwardDiagonalLines.push(currTopLine);
  }

  return [
    ...horizontalLines,
    ...verticalLines,
    ...forwardDiagonalLines,
    ...backwardDiagonalLines,
  ].join(",");
};

const countXMas = () => {
  const combinedString = combineStrings();
  const regex = /(?=(XMAS|SAMX))/g;
  const matches = [...combinedString.matchAll(regex)].map((match) => match[0]);
  return matches.length;
};

const countXDashMas = () => {
  let count = 0;
  const horizontalLines: string[] = input.split("\n").filter((l) => l);

  for (let vertInd = 1; vertInd < horizontalLines.length - 1; vertInd++) {
    const line = horizontalLines[vertInd];
    for (
      let horInd = 1;
      horInd < horizontalLines[vertInd].length - 1;
      horInd++
    ) {
      const current = line[horInd];
      if (current !== "A") {
        continue;
      }
      let forwardDiagonal =
        horizontalLines[vertInd + 1][horInd - 1] +
        current +
        horizontalLines[vertInd - 1][horInd + 1];
      let backwardDiagonal =
        horizontalLines[vertInd - 1][horInd - 1] +
        current +
        horizontalLines[vertInd + 1][horInd + 1];
      const regex = /MAS|SAM/;
      if (forwardDiagonal.match(regex) && backwardDiagonal.match(regex)) {
        count += 1;
      }
    }
  }
  return count;
};

console.log(`Answer to Q4A: ${countXMas()}`);
console.log(`Answer to Q4B: ${countXDashMas()}`);
