const fs = require("fs")
const inputArr = fs.readFileSync("./inputs/inputQ11.txt", "utf-8").split("\n")
let dumboGrid = inputArr.map((row) => row.split("").map(Number))

const numOfSteps = 100
let flashCount = 0
let flashCountAtNumOfSteps = 0
let superFlash

const increaseEnergyLevels = () => {
  let newDumboGrid = dumboGrid.map((row) => row.map((energy) => (energy += 1)))
  dumboGrid = [...newDumboGrid]
}

const performFlashes = () => {
  let keepOnFlashing = true
  let flashedLocationStrings = []
  let flashedLocations = []

  while (keepOnFlashing) {
    let anyFLashOccurred = false
    dumboGrid.forEach((row, rowI) => {
      row.forEach((energy, energyI) => {
        const flashLocationString = (energyI + "-" + rowI).toString()
        if (
          !flashedLocationStrings.includes(flashLocationString) &&
          energy > 9
        ) {
          anyFLashOccurred = true
          flashCount++
          flashedLocationStrings.push(flashLocationString)
          flashedLocations.push([rowI, energyI])

          if (rowI >= 1) {
            dumboGrid[rowI - 1][energyI]++
            if (energyI < dumboGrid[0].length - 1) {
              dumboGrid[rowI - 1][energyI + 1]++
            }
            if (energyI >= 1) {
              dumboGrid[rowI - 1][energyI - 1]++
            }
          }
          if (rowI < dumboGrid.length - 1) {
            dumboGrid[rowI + 1][energyI]++
            if (energyI < dumboGrid[0].length - 1) {
              dumboGrid[rowI + 1][energyI + 1]++
            }
            if (energyI >= 1) {
              dumboGrid[rowI + 1][energyI - 1]++
            }
          }
          if (energyI < dumboGrid[0].length - 1) {
            dumboGrid[rowI][energyI + 1]++
          }
          if (energyI >= 1) {
            dumboGrid[rowI][energyI - 1]++
          }
        }
      })
    })
    keepOnFlashing = anyFLashOccurred
  }
  flashedLocations.forEach((location) => {
    dumboGrid[location[0]][location[1]] = 0
  })
}

const checkForSuperFlash = () => {
  let superFlashOccurred = true
  dumboGrid.forEach((row) => {
    row.forEach((energy) => {
      if (energy !== 0) {
        superFlashOccurred = false
        return
      }
    })
  })
  return superFlashOccurred
}

const performStep = (numOfSteps) => {
  let i = 0
  while (i < numOfSteps || !superFlash) {
    increaseEnergyLevels()
    performFlashes()
    if (i === numOfSteps - 1) {
      flashCountAtNumOfSteps = flashCount
    }
    const superFLashOccurred = checkForSuperFlash()
    if (superFLashOccurred) {
      superFlash = i + 1
    }
    i++
  }
}

performStep(numOfSteps)
console.log("Answer Q11.A:", flashCountAtNumOfSteps)
console.log("Answer Q11.B:", superFlash)
