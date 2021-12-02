const fs = require("fs")
const directions = fs.readFileSync("./inputs/inputQ3.txt").toString()

let positionSanta = { northSouth: 0, eastWest: 0 }
let traveledPathYear1 = ["NS:0;EW:0"]
let uniqueHousesYear1 = 1

let positionCheatingSanta = { northSouth: 0, eastWest: 0 }
let positionRoboSanta = { northSouth: 0, eastWest: 0 }
let passedHousesYear2 = ["NS:0;EW:0"]
let uniqueHousesYear2 = 1

for (let i = 0; i < directions.length; i++) {
  const isEven = Boolean(i % 2 === 0)

  switch (directions[i]) {
    case "^":
      positionSanta.northSouth++
      if (isEven) positionCheatingSanta.northSouth++
      else positionRoboSanta.northSouth++
      break
    case "v":
      positionSanta.northSouth--
      if (isEven) positionCheatingSanta.northSouth--
      else positionRoboSanta.northSouth--
      break
    case ">":
      positionSanta.eastWest++
      if (isEven) positionCheatingSanta.eastWest++
      else positionRoboSanta.eastWest++
      break
    case "<":
      positionSanta.eastWest--
      if (isEven) positionCheatingSanta.eastWest--
      else positionRoboSanta.eastWest--
      break
  }

  const currentPositionYear1 = `NS:${positionSanta.northSouth};EW:${positionSanta.eastWest}`
  if (!traveledPathYear1.includes(currentPositionYear1)) uniqueHousesYear1++
  traveledPathYear1.push(currentPositionYear1)

  const currentPositionYear2 = `NS:${
    isEven ? positionCheatingSanta.northSouth : positionRoboSanta.northSouth
  };EW:${isEven ? positionCheatingSanta.eastWest : positionRoboSanta.eastWest}`
  if (!passedHousesYear2.includes(currentPositionYear2)) uniqueHousesYear2++
  passedHousesYear2.push(currentPositionYear2)
}

console.log("Answer Q1.A:", uniqueHousesYear1)
console.log("Answer Q1.B:", uniqueHousesYear2)
