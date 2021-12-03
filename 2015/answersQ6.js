const fs = require("fs")
const inputArr = fs.readFileSync("./inputs/inputQ6.txt").toString().split("\n")
const instructionArr = inputArr.map((input) => input.split(/[ ,]+/))

const gridSize = 1000
let lightGrid = []
let verticalLights = []
let burningLightCount = 0

let brightLightGrid = []
let verticalBrightLights = []
let totalBrightness = 0

for (let i = 0; i < gridSize; i++) {
  verticalLights.push(false)
  verticalBrightLights.push(0)
}

for (let i = 0; i < gridSize; i++) {
  lightGrid.push([...verticalLights])
  brightLightGrid.push([...verticalBrightLights])
}

instructionArr.forEach((instruction) => {
  const xStart = parseInt(instruction[1])
  const xEnd = parseInt(instruction[4])
  const yStart = parseInt(instruction[2])
  const yEnd = parseInt(instruction[5])

  for (let x = xStart; x < xEnd + 1; x++) {
    for (let y = yStart; y < yEnd + 1; y++) {
      switch (instruction[0]) {
        case "toggle":
          lightGrid[x][y] = !lightGrid[x][y]
          brightLightGrid[x][y] += 2
          break
        case "turnOn":
          lightGrid[x][y] = true
          brightLightGrid[x][y]++
          break
        case "turnOff":
          lightGrid[x][y] = false
          if (brightLightGrid[x][y] > 0) brightLightGrid[x][y]--
          break
      }
    }
  }
})

lightGrid.forEach((lightColumn) => {
  lightColumn.forEach((light) => {
    if (light) burningLightCount++
  })
})

brightLightGrid.forEach((lightColumn) => {
  lightColumn.forEach((brightness) => {
    totalBrightness += brightness
  })
})

console.log("Answer Q6.A:", burningLightCount)
console.log("Answer Q6.B:", totalBrightness)
