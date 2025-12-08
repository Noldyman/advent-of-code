import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ7.txt", "utf-8");
const lines = input.split("\n").filter((l) => !!l);

type BeamAndPath = { index: number; pathCount: number };

const countSplits = () => {
  const startIndex = lines[0].indexOf("S");
  let splitCount = 0;
  let beamIndexes = [startIndex];
  let beamIndexesWithPathCount: BeamAndPath[] = [
    { index: startIndex, pathCount: 1 },
  ];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const newBeamIndexes: number[] = [];
    const newBeamIndexesWithPathCount: BeamAndPath[] = [];

    innerLoop: for (let y = 0; y < line.length; y++) {
      if (!beamIndexes.includes(y)) {
        continue innerLoop;
      }

      const current = line[y];

      if (current === "^") {
        splitCount += 1;
        const left = y - 1;
        const right = y + 1;

        if (left >= 0 && !newBeamIndexes.includes(left)) {
          newBeamIndexes.push(left);
        }
        if (right <= line.length - 1 && !newBeamIndexes.includes(right)) {
          newBeamIndexes.push(right);
        }

        const past = beamIndexesWithPathCount.find(({ index }) => index === y);
        const leftPast = beamIndexesWithPathCount.find(
          ({ index }) => index === y - 1
        );
        const rightPast = beamIndexesWithPathCount.find(
          ({ index }) => index === y + 1
        );

        const pastPathCount = past?.pathCount ?? 0;
        const leftPastPathCount = leftPast?.pathCount ?? 0;
        const rightPastPathCount = rightPast?.pathCount ?? 0;
        const leftInd = newBeamIndexesWithPathCount.findIndex(
          ({ index }) => index === left
        );
        const rightInd = newBeamIndexesWithPathCount.findIndex(
          ({ index }) => index === right
        );
        if (leftInd >= 0) {
          newBeamIndexesWithPathCount[leftInd].pathCount =
            newBeamIndexesWithPathCount[leftInd].pathCount + pastPathCount;
        } else {
          newBeamIndexesWithPathCount.push({
            index: left,
            pathCount: pastPathCount + leftPastPathCount,
          });
        }
        if (rightInd >= 0) {
          newBeamIndexesWithPathCount[rightInd].pathCount =
            newBeamIndexesWithPathCount[rightInd].pathCount + pastPathCount;
        } else {
          newBeamIndexesWithPathCount.push({
            index: right,
            pathCount: pastPathCount + rightPastPathCount,
          });
        }
      } else {
        if (!newBeamIndexes.includes(y)) {
          newBeamIndexes.push(y);
          const past = beamIndexesWithPathCount.find(
            ({ index }) => index === y
          );
          newBeamIndexesWithPathCount.push({ ...past! });
        }
      }
    }

    beamIndexes = [...newBeamIndexes];
    beamIndexesWithPathCount = newBeamIndexesWithPathCount.map((c) => ({
      ...c,
    }));
  }
  let totalPathCount = 0;
  beamIndexesWithPathCount.forEach(({ pathCount }) => {
    totalPathCount += pathCount;
  });

  return { splitCount, totalPathCount };
};

const { splitCount, totalPathCount } = countSplits();

console.log("Answer to Q7A:", splitCount);
console.log("Answer to Q7B:", totalPathCount);
