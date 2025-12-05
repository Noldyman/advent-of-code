import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ5.txt", "utf-8");

const formatInput = () => {
  const splitInput = input.split("\n\n");
  const freshIngredientIdRanges = splitInput[0]
    .split("\n")
    .map((line) => line.split("-").map(Number)) as [number, number][];
  const ingredientIds = splitInput[1]
    .split("\n")
    .filter((c) => c !== "")
    .map(Number);
  return { freshIngredientIdRanges, ingredientIds };
};

const countFreshIngredients = (
  freshIngredientIdRanges: [number, number][],
  ingredientIds: number[]
) => {
  let count = 0;

  ingredientLoop: for (const ingredientId of ingredientIds) {
    for (const [rangeStart, rangeEnd] of freshIngredientIdRanges) {
      if (ingredientId >= rangeStart && ingredientId <= rangeEnd) {
        count += 1;
        continue ingredientLoop;
      }
    }
  }

  return count;
};

const countFreshIngredientIds = (
  freshIngredientIdRanges: [number, number][]
) => {
  let cleanRanges: [number, number][] = [freshIngredientIdRanges[0]];

  outerloop: for (let i = 1; i < freshIngredientIdRanges.length; i++) {
    let iStart = freshIngredientIdRanges[i][0];
    let iEnd = freshIngredientIdRanges[i][1];
    const indexesToRemove: number[] = [];

    innerloop: for (let y = 0; y < cleanRanges.length; y++) {
      const yStart = cleanRanges[y][0];
      const yEnd = cleanRanges[y][1];

      if (iStart < yStart) {
        if (iEnd < yStart) {
          continue innerloop;
        } else if (iEnd >= yStart && iEnd <= yEnd) {
          iEnd = yStart - 1;
        } else {
          indexesToRemove.push(y);
        }
      } else if (iStart >= yStart && iStart <= yEnd) {
        if (iEnd <= yEnd) {
          continue outerloop;
        } else {
          iStart = yEnd + 1;
        }
      }
    }

    cleanRanges = cleanRanges.filter(
      (_, index) => !indexesToRemove.includes(index)
    );
    cleanRanges.push([iStart, iEnd]);
  }

  let count = 0;
  for (const range of cleanRanges) {
    count += range[1] - range[0] + 1;
  }
  return count;
};

const { freshIngredientIdRanges, ingredientIds } = formatInput();
console.log(
  "Answer to 2025 Q5 A:",
  countFreshIngredients(freshIngredientIdRanges, ingredientIds)
);
console.log(
  "Answer to 2025 Q5 B:",
  countFreshIngredientIds(freshIngredientIdRanges)
);
