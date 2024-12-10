import fs from "fs";
const input = fs
  .readFileSync("./inputs/inputQ9.txt", "utf-8")
  .replace("\n", "");

type FilePart = number | ".";

const formatInput = () => {
  const fileArr: FilePart[] = [];

  let currId = 0;
  for (let i = 0; i < input.length; i++) {
    const value = parseInt(input[i]);
    if (i % 2 === 0) {
      for (let ind = 0; ind < value; ind++) {
        fileArr.push(currId);
      }
    } else {
      for (let ind = 0; ind < value; ind++) {
        fileArr.push(".");
      }

      currId += 1;
    }
  }
  return fileArr;
};

const compressFileBlocks = (fileArr: FilePart[]) => {
  let compressedFileArr = [...fileArr];

  for (let endInd = fileArr.length - 1; endInd >= 0; endInd--) {
    if (fileArr[endInd] === ".") {
      continue;
    }

    const emptyInd = compressedFileArr.indexOf(".");
    if (emptyInd >= endInd || emptyInd === -1) {
      break;
    }
    compressedFileArr[emptyInd] = compressedFileArr[endInd];
    compressedFileArr[endInd] = ".";
  }
  return compressedFileArr;
};

const getChecksum = (compressedFileArr: FilePart[]) => {
  let sum = 0;

  for (let i = 0; i < compressedFileArr.length; i++) {
    if (compressedFileArr[i] === ".") {
      continue;
    }

    sum += i * (compressedFileArr[i] as number);
  }
  return sum;
};

const fileString = formatInput();
const compressedFileArr = compressFileBlocks(fileString);
console.log(`Asnwer to Q9A: ${getChecksum(compressedFileArr)}`);
