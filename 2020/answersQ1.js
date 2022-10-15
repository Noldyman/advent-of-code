const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ1.txt", "utf-8");
const entries = input.split("\n").map(Number);

const computeQ1A = () => {
  let product = 0;
  entries.forEach((entry, index) => {
    entries.forEach((entr, ind) => {
      if (ind !== index && entry + entr === 2020)
        return (product = entry * entr);
    });
  });
  return product;
};

const computeQ1B = () => {
  let product = 0;
  entries.forEach((entry, index) => {
    entries.forEach((entr, ind) => {
      entries.forEach((e, i) => {
        if (index !== ind && index !== i && entry + entr + e === 2020)
          return (product = entry * entr * e);
      });
    });
  });
  return product;
};

console.log("Answer to Q1A:", computeQ1A());
console.log("Answer to Q1B:", computeQ1B());
