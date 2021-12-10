const fs = require('fs');
const inputArr = fs.readFileSync('./inputs/inputQ9.txt', 'utf-8').split('\n');
const mapRows = inputArr
  .map((input) => input.trim('\r'))
  .filter((input) => input !== '');

const calcSumOfRiskLevels = () => {
  let sumOfRiskLevels = 0;

  mapRows.forEach((row, index) => {
    for (let i = 0; i < row.length; i++) {
      const current = parseInt(row[i]);
      const left = i - 1 >= 0 ? parseInt(row[i - 1]) : 9;
      const right = i + 1 === row.length ? 9 : parseInt(row[i + 1]);
      const top = index < 1 ? 9 : parseInt(mapRows[index - 1][i]);
      const bottom =
        index + 1 === mapRows.length ? 9 : parseInt(mapRows[index + 1][i]);

      if (
        current < left &&
        current < right &&
        current < top &&
        current < bottom
      ) {
        sumOfRiskLevels += 1 + current;
      }
    }
  });
  return sumOfRiskLevels;
};

console.log('Answer Q9.A:', calcSumOfRiskLevels());
