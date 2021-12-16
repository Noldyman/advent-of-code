const fs = require('fs');
const inputArr = fs.readFileSync('./inputs/inputQ11.txt', 'utf-8').split('\n');
let dumboGrid = inputArr.map((row) => row.split('').map(Number));

const numOfSteps = 2;
let flashCount = 0;

const increaseEnergyLevels = () => {
  let newDumboGrid = dumboGrid.map((row) => row.map((energy) => (energy += 1)));
  dumboGrid = [...newDumboGrid];
};

const performFlashes = (flashedDumboIndexes) => {
  let flashedLocations = [];
  let flashedLocationsChanged = false;
  let newDumboGrid = dumboGrid.forEach((row, rowI) => {
    row.map((energy, energyI) => {
      const flashLocation = (energyI + '-' + rowI).toString();
      if (!flashedLocations.includes(flashLocation) && energy > 9) {
        flashCount;
        flashedLocations.push(flashLocation);
        flashedLocationsChanged = true;
      }
    });
  });
  dumboGrid = [...newDumboGrid];
};

const performStep = (numOfSteps) => {
  let flashedDumboIndexes = [];
  for (let i = 0; i < numOfSteps; i++) {
    increaseEnergyLevels();
  }
};

performStep(numOfSteps);
