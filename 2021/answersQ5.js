const fs = require("fs")
const inputArr = fs.readFileSync("./inputs/inputQ5.txt").toString().split("\n")
const coordinatesArr = inputArr.map((input) =>
  input
    .replace(/\s+/g, "")
    .split("->")
    .map((coordinate) => coordinate.split(",").map(Number))
)

const getHorizontalAndVerticalLines = (ventsArray) =>
  ventsArray.filter(
    (coordinates) =>
      coordinates[0][0] === coordinates[1][0] ||
      coordinates[0][1] === coordinates[1][1]
  )

const plotVentLocations = (ventsArray) => {
  let ventLocationsArr = []

  ventsArray.forEach((vent) => {
    const x1 = vent[0][0]
    const y1 = vent[0][1]
    const x2 = vent[1][0]
    const y2 = vent[1][1]

    if (x1 === x2) {
      const lowY = y1 < y2 ? y1 : y2
      const highY = y1 > y2 ? y1 : y2

      for (let i = lowY; i <= highY; i++) {
        const coordinates = [x1, i]
        const overlappingVentIndex = ventLocationsArr.findIndex(
          (ventLocation) =>
            ventLocation.coordinates[0] === coordinates[0] &&
            ventLocation.coordinates[1] === coordinates[1]
        )

        if (overlappingVentIndex !== -1) {
          ventLocationsArr[overlappingVentIndex].ventCount++
        } else {
          ventLocationsArr.push({ coordinates: coordinates, ventCount: 1 })
        }
      }
    } else if (y1 === y2) {
      const lowX = x1 < x2 ? x1 : x2
      const highX = x1 > x2 ? x1 : x2

      for (let i = lowX; i <= highX; i++) {
        const coordinates = [i, y1]
        const overlappingVentIndex = ventLocationsArr.findIndex(
          (ventLocation) =>
            ventLocation.coordinates[0] === coordinates[0] &&
            ventLocation.coordinates[1] === coordinates[1]
        )

        if (overlappingVentIndex !== -1) {
          ventLocationsArr[overlappingVentIndex].ventCount++
        } else {
          ventLocationsArr.push({ coordinates: coordinates, ventCount: 1 })
        }
      }
    } else {
      const lowX = x1 < x2 ? x1 : x2
      const highX = x1 > x2 ? x1 : x2
      const lowY = y1 < y2 ? y1 : y2
      const numOfVents = highX - lowX + 1

      if (lowX === x1) {
        for (let i = 0; i < numOfVents; i++) {
          const coordinates = lowY === y1 ? [x1 + i, y1 + i] : [x1 + i, y1 - i]
          const overlappingVentIndex = ventLocationsArr.findIndex(
            (ventLocation) =>
              ventLocation.coordinates[0] === coordinates[0] &&
              ventLocation.coordinates[1] === coordinates[1]
          )

          if (overlappingVentIndex !== -1) {
            ventLocationsArr[overlappingVentIndex].ventCount++
          } else {
            ventLocationsArr.push({ coordinates: coordinates, ventCount: 1 })
          }
        }
      }
      if (highX === x1) {
        for (let i = 0; i < numOfVents; i++) {
          const coordinates = lowY === y1 ? [x1 - i, y1 + i] : [x1 - i, y1 - i]
          const overlappingVentIndex = ventLocationsArr.findIndex(
            (ventLocation) =>
              ventLocation.coordinates[0] === coordinates[0] &&
              ventLocation.coordinates[1] === coordinates[1]
          )

          if (overlappingVentIndex !== -1) {
            ventLocationsArr[overlappingVentIndex].ventCount++
          } else {
            ventLocationsArr.push({ coordinates: coordinates, ventCount: 1 })
          }
        }
      }
    }
  })

  return ventLocationsArr
}

const countDangerZones = (ventLocations) => {
  let dangerZoneCount = 0

  ventLocations.forEach((vent) => {
    if (vent.ventCount > 1) dangerZoneCount++
  })

  return dangerZoneCount
}

const horAndVertVentsArr = getHorizontalAndVerticalLines(coordinatesArr)
const horAndVertVentsLocationPlot = plotVentLocations(horAndVertVentsArr)
const allVentsLocationPlot = plotVentLocations(coordinatesArr)

console.log("Answer to Q5.A:", countDangerZones(horAndVertVentsLocationPlot))
console.log("Answer to Q5.B:", countDangerZones(allVentsLocationPlot))
