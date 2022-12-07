const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ7.txt", "utf-8").split("\n");

const calculateDirectorySizes = () => {
  let directorySizes = {
    totalOuterDir: 0,
    outerDir: 0,
  };
  let currentDir = [];

  input.forEach((line) => {
    if (line.startsWith("$")) {
      if (line.startsWith("$ cd /")) {
        currentDir = [];
      } else if (line.startsWith("$ cd ..")) {
        currentDir.pop();
      } else if (line.startsWith("$ cd")) {
        const splitLine = line.split(" ");
        currentDir.push(splitLine[2]);
      }
    } else {
      if (!line.startsWith("dir")) {
        const splitLine = line.split(" ");
        directorySizes.totalOuterDir += parseInt(splitLine[0]);
        if (currentDir.length) {
          currentDir.forEach((_, i) => {
            let fullPath = "";
            for (let ind = 0; ind <= i; ind++) {
              fullPath += currentDir[ind];
            }

            if (!directorySizes[fullPath]) {
              directorySizes[fullPath] = parseInt(splitLine[0]);
            } else {
              directorySizes[fullPath] += parseInt(splitLine[0]);
            }
          });
        }
      }
    }
  });

  return directorySizes;
};

const calulateSumOfSizes = (directorySizes, maxSize) => {
  let sum = 0;

  for (const key in directorySizes) {
    if (directorySizes[key] <= maxSize) {
      sum += directorySizes[key];
    }
  }

  return sum;
};

const findSizeOfDirToDelete = (
  directorySizes,
  totalAvailableSpace,
  neededFreeSpace
) => {
  const minimalSizeNeeded =
    neededFreeSpace - (totalAvailableSpace - directorySizes.totalOuterDir);
  const dirSizes = Object.values(directorySizes);
  const sortedDirSizes = dirSizes.sort((b, a) => b - a);

  return sortedDirSizes.find((dirSize) => dirSize >= minimalSizeNeeded);
};

const directorySizes = calculateDirectorySizes();
console.log("Answer to Q7a:", calulateSumOfSizes(directorySizes, 100000));
console.log(
  "Answer to Q7b:",
  findSizeOfDirToDelete(directorySizes, 70000000, 30000000)
);
