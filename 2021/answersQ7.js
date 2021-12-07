const fs = require('fs')
const inputArr = fs.readFileSync('./inputs/inputQ7.txt', 'utf-8').split(',')
const crabLocationArr = inputArr.map(Number)

const calculateNeededFuelPerLocation = (realisticModeIsOn) => {
  const HighestLocation = Math.max(...crabLocationArr)
  let neededFuelArr = []

  for (let i = 0; i <= HighestLocation; i++) {
    let neededFuel = 0
    crabLocationArr.forEach((location) => {
      if (realisticModeIsOn) {
        neededFuel += calcRealisticFuelcost(Math.abs(location - i))
      } else {
        neededFuel += Math.abs(location - i)
      }
    })
    neededFuelArr.push(neededFuel)
  }

  return neededFuelArr
}

const calcRealisticFuelcost = (numOfSteps) => {
  let fuelCost = 0

  for (let i = 1; i <= numOfSteps; i++) {
    fuelCost += i
  }

  return fuelCost
}

const neededFuelconstantRateArr = calculateNeededFuelPerLocation(false)
const realisticNeededFuelArr = calculateNeededFuelPerLocation(true)

console.log('Answer Q7.A:', Math.min(...neededFuelconstantRateArr))
console.log('Answer Q7.B:', Math.min(...realisticNeededFuelArr))
