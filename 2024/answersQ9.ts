import fs from "fs";
const input = fs
  .readFileSync("./inputs/inputQ9.txt", "utf-8")
  .replace("\n", "");

type FilePart = number | ".";
type FilePart2 = number[] | string;

const formatInput = () => {
  const fileArr: FilePart[] = [];
  const fileArr2: FilePart2[] = [];

  let currId = 0;
  for (let i = 0; i < input.length; i++) {
    const value = parseInt(input[i]);
    if (i % 2 === 0) {
      for (let ind = 0; ind < value; ind++) {
        fileArr.push(currId);
      }
      fileArr2.push(Array.from({ length: value }, () => currId));
    } else {
      if (value > 0) {
        for (let ind = 0; ind < value; ind++) {
          fileArr.push(".");
        }
        fileArr2.push(".".repeat(value));
      }
      currId += 1;
    }
  }
  return { fileArr, fileArr2 };
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

const compressFileBlocks2 = (fileArr: FilePart2[]) => {
  let compressedFileArr = [
    ...fileArr.map((c) => (typeof c === "string" ? c : [...c])),
  ];

  for (let endInd = fileArr.length - 1; endInd >= 0; endInd--) {
    if (typeof compressedFileArr[endInd] === "string") {
      continue;
    }

    const emptyInd = compressedFileArr.findIndex(
      (curr) =>
        typeof curr === "string" &&
        curr.length >= compressedFileArr[endInd].length
    );
    if (emptyInd >= endInd || emptyInd === -1) {
      continue;
    }
    const currFile = [...(compressedFileArr[endInd] as number[])];
    const currEmpty = compressedFileArr[emptyInd] as string;
    if (currFile.length === currEmpty.length) {
      compressedFileArr[emptyInd] = currFile;
      compressedFileArr[endInd] = currEmpty;
    } else {
      compressedFileArr[emptyInd] = ".".repeat(
        currEmpty.length - currFile.length
      );
      compressedFileArr[endInd] = ".".repeat(currFile.length);
      compressedFileArr.splice(emptyInd, 0, currFile);
      endInd += 2;
    }
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

const getChecksum2 = (compressedFileArr2: FilePart2[]) => {
  const compressedFileArr: FilePart[] = compressedFileArr2.flatMap((item) =>
    //@ts-ignore
    Array.isArray(item) ? item : item.split("")
  );
  let sum = 0;

  for (let i = 0; i < compressedFileArr.length; i++) {
    if (compressedFileArr[i] === ".") {
      continue;
    }

    sum += i * (compressedFileArr[i] as number);
  }
  return sum;
};

const { fileArr, fileArr2 } = formatInput();
const compressedFileArr = compressFileBlocks(fileArr);
const compressedFileArr2 = compressFileBlocks2(fileArr2);
console.log(`Asnwer to Q9A: ${getChecksum(compressedFileArr)}`);
console.log(`Asnwer to Q9B: ${getChecksum2(compressedFileArr2)}`);
