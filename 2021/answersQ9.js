const fs = require("fs")
const inputArr = fs.readFileSync("./inputs/inputQ9.txt", "utf-8").split("\n")
const mapRows = inputArr
  .map((input) => input.trim("\r"))
  .filter((input) => input !== "")

let lowPointsArr = []
let basinSizes = []

const calcSumOfRiskLevels = () => {
  let sumOfRiskLevels = 0

  mapRows.forEach((row, index) => {
    for (let i = 0; i < row.length; i++) {
      const current = parseInt(row[i])
      const left = i - 1 >= 0 ? parseInt(row[i - 1]) : 10
      const right = i + 1 === row.length ? 10 : parseInt(row[i + 1])
      const top = index < 1 ? 10 : parseInt(mapRows[index - 1][i])
      const bottom =
        index + 1 === mapRows.length ? 10 : parseInt(mapRows[index + 1][i])

      if (
        current < left &&
        current < right &&
        current < top &&
        current < bottom
      ) {
        sumOfRiskLevels += 1 + current
        lowPointsArr.push([index, i])
        basinSizes.push(1)
      }
    }
  })
  return sumOfRiskLevels
}

const mapBasinSizes = () => {
  let checkedLocationsArr = [...lowPointsArr]
  let lastcheckedLocations = []
  lowPointsArr.forEach((loc, i) => {
    lastcheckedLocations.push([loc[0], loc[1], i])
  })

  const positionBeenChecked = (rowI, locI) => {
    let beenchecked = false
    checkedLocationsArr.forEach((loc) => {
      if (loc[0] === rowI && loc[1] === locI) beenchecked = true
    })
    return beenchecked
  }

  while (lastcheckedLocations.length > 0) {
    let newLastCheckedLocations = []
    lastcheckedLocations.forEach((location) => {
      const rowI = location[0]
      const locI = location[1]
      const basI = location[2]

      if (rowI > 0) {
        topLoc = parseInt(mapRows[rowI - 1][locI])
        if (topLoc < 9 && !positionBeenChecked(rowI - 1, locI)) {
          basinSizes[basI] += 1
          checkedLocationsArr.push([rowI - 1, locI])
          newLastCheckedLocations.push([rowI - 1, locI, basI])
        }
      }
      if (locI < mapRows[0].length - 1) {
        rightLoc = parseInt(mapRows[rowI][locI + 1])
        if (rightLoc < 9 && !positionBeenChecked(rowI, locI + 1)) {
          basinSizes[basI] += 1
          checkedLocationsArr.push([rowI, locI + 1])
          newLastCheckedLocations.push([rowI, locI + 1, basI])
        }
      }
      if (rowI < mapRows.length - 1) {
        bottomLoc = parseInt(mapRows[rowI + 1][locI])
        if (bottomLoc < 9 && !positionBeenChecked(rowI + 1, locI)) {
          basinSizes[basI] += 1
          checkedLocationsArr.push([rowI + 1, locI])
          newLastCheckedLocations.push([rowI + 1, locI, basI])
        }
      }
      if (locI > 0) {
        leftLoc = parseInt(mapRows[rowI][locI - 1])
        if (leftLoc < 9 && !positionBeenChecked(rowI, locI - 1)) {
          basinSizes[basI] += 1
          checkedLocationsArr.push([rowI, locI - 1])
          newLastCheckedLocations.push([rowI, locI - 1, basI])
        }
      }
    })
    lastcheckedLocations = [...newLastCheckedLocations]
  }
}

const multiplyLargestBasins = () => {
  basinSizes.sort((a, b) => b - a)
  return basinSizes[0] * basinSizes[1] * basinSizes[2]
}

console.log("Answer Q9.A:", calcSumOfRiskLevels())
mapBasinSizes()
console.log("Answer Q9.B:", multiplyLargestBasins())
