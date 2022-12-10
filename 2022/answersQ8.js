const fs = require("fs");
const treeGrid = fs
  .readFileSync("./inputs/inputQ8.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map(Number));

const countVisibleTrees = (grid) => {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  let count = gridHeight * 2 + (gridWidth - 2) * 2;

  grid.forEach((row, rowIndex) => {
    if (rowIndex === 0 || rowIndex === gridHeight - 1) return;
    row.forEach((tree, treeIndex) => {
      if (treeIndex === 0 || treeIndex === gridWidth - 1) return;
      let treeIsCounted = false;
      let treeIsNotVisible = false;

      while (!treeIsCounted && !treeIsNotVisible) {
        let isVisibleFromLeft = true;
        for (let i = 0; i < treeIndex; i++) {
          if (row[i] >= tree) {
            isVisibleFromLeft = false;
            break;
          }
        }
        if (isVisibleFromLeft) {
          count += 1;
          treeIsCounted = true;
          break;
        }

        let isVisibleFromRight = true;
        for (let i = treeIndex + 1; i < gridWidth; i++) {
          if (row[i] >= tree) {
            isVisibleFromRight = false;
            break;
          }
        }
        if (isVisibleFromRight) {
          count += 1;
          treeIsCounted = true;
          break;
        }

        let isVisibleFromTop = true;
        for (let i = 0; i < rowIndex; i++) {
          if (grid[i][treeIndex] >= tree) {
            isVisibleFromTop = false;
            break;
          }
        }
        if (isVisibleFromTop) {
          count += 1;
          treeIsCounted = true;
          break;
        }

        let isVisibleFromBottom = true;
        for (let i = rowIndex + 1; i < gridHeight; i++) {
          if (grid[i][treeIndex] >= tree) {
            isVisibleFromBottom = false;
            break;
          }
        }
        if (isVisibleFromBottom) {
          count += 1;
          treeIsCounted = true;
          break;
        }

        treeIsNotVisible = true;
      }
    });
  });

  return count;
};

const getHighestScenicScore = (grid) => {
  let highScore = 0;
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  grid.forEach((row, rowIndex) => {
    row.forEach((tree, treeIndex) => {
      let leftScore = 0;
      if (treeIndex !== 0) {
        for (let i = treeIndex - 1; i >= 0; i--) {
          leftScore += 1;
          if (row[i] >= tree) break;
        }
      }

      let rightScore = 0;
      if (treeIndex !== gridWidth - 1) {
        for (let i = treeIndex + 1; i < gridWidth; i++) {
          rightScore += 1;
          if (row[i] >= tree) break;
        }
      }

      let topScore = 0;
      if (rowIndex !== 0) {
        for (let i = rowIndex - 1; i >= 0; i--) {
          topScore += 1;
          if (grid[i][treeIndex] >= tree) break;
        }
      }

      let downScore = 0;
      if (rowIndex !== gridHeight - 1) {
        for (let i = rowIndex + 1; i < gridHeight; i++) {
          downScore += 1;
          if (grid[i][treeIndex] >= tree) break;
        }
      }
      const score = leftScore * rightScore * topScore * downScore;
      if (score > highScore) highScore = score;
    });
  });

  return highScore;
};

console.log("Answer to Q8a:", countVisibleTrees(treeGrid));
console.log("Answer to Q8b:", getHighestScenicScore(treeGrid));
