const fs = require("fs")
const input = fs.readFileSync("./inputs/inputQ13.txt", "utf-8").split("\n")
const rawFoldInstructions = input.filter((item) => item.includes("fold along"))
const rawDotCoordinates = input.filter(
  (item) => item && !item.includes("fold along")
)
const foldInstructions = rawFoldInstructions.map((instr) => instr.split("="))
const dotCoordinates = rawDotCoordinates.map((dot) =>
  dot.split(",").map(Number)
)

const findGridDimmensions = (dotCoordinates) => {
  const firstXFold = parseInt(
    foldInstructions.find((instr) => instr[0].includes("x"))[1]
  )
  const firstYFold = parseInt(
    foldInstructions.find((instr) => instr[0].includes("y"))[1]
  )

  return {
    width: firstXFold * 2 + 1,
    height: firstYFold * 2 + 1,
  }
}

const createEmptyGrid = (dotCoordinates) => {
  emptyRow = []
  emptyGrid = []
  dimensions = findGridDimmensions(dotCoordinates)

  for (let i = 0; i < dimensions.width; i++) {
    emptyRow.push(".")
  }
  for (let i = 0; i < dimensions.height; i++) {
    emptyGrid.push([...emptyRow])
  }

  return emptyGrid
}

const placeDotsInGrid = (dotCoordinates) => {
  let grid = createEmptyGrid(dotCoordinates)

  dotCoordinates.forEach((dot) => {
    grid[dot[1]][dot[0]] = "#"
  })

  return grid
}

const performFold = (grid, instruction) => {
  let foldedGrid = []
  if (instruction[0].includes("y")) {
    let topGrid = [...grid]
    let bottomGrid = topGrid.splice(parseInt(instruction[1]))
    bottomGrid.reverse().pop()

    topGrid.forEach((row, rowI) => {
      let newRow = []
      row.forEach((dot, dotI) => {
        if (dot === "#" || bottomGrid[rowI][dotI] === "#") {
          newRow.push("#")
        } else newRow.push(".")
      })
      foldedGrid.push(newRow)
    })
  } else {
    let leftGrid = []
    let rightGrid = []

    grid.forEach((row) => {
      let leftPart = [...row]
      let rightPart = leftPart.splice(parseInt(instruction[1]))
      rightPart.reverse().pop()
      leftGrid.push([...leftPart])
      rightGrid.push([...rightPart])
    })

    leftGrid.forEach((row, rowI) => {
      let newRow = []
      row.forEach((dot, dotI) => {
        if (dot === "#" || rightGrid[rowI][dotI] === "#") {
          newRow.push("#")
        } else newRow.push(".")
      })
      foldedGrid.push(newRow)
    })
  }
  return foldedGrid
}

const countDots = (grid) => {
  let dotCount = 0
  grid.forEach((row) => {
    row.forEach((dot) => {
      if (dot === "#") dotCount++
    })
  })
  return dotCount
}

const performAllFolds = (originalGrid, instructions) => {
  let foldedGrid = [...originalGrid]

  for (let i = 0; i < instructions.length; i++) {
    const newFoldedGrid = performFold(foldedGrid, instructions[i])
    foldedGrid = newFoldedGrid
  }

  return foldedGrid
}

const separateLetters = (grid) => {
  let separatedGrid = []
  const letterWidth = 5
  const numOfLetters = grid[0].length / letterWidth

  for (let i = 0; i < numOfLetters; i++) {
    separatedGrid.push([])
  }

  grid.forEach((row) => {
    let letterIndex = 0
    for (let i = 0; i < grid[0].length; i += letterWidth) {
      let newRow = []
      for (let y = 0; y < letterWidth; y++) {
        newRow.push(row[i + y])
      }
      separatedGrid[letterIndex].push(newRow)
      letterIndex++
    }
  })
  return separatedGrid
}

const grid = placeDotsInGrid(dotCoordinates)
const firstFoldGrid = performFold(grid, foldInstructions[0])
const fullFoldGrid = performAllFolds(grid, foldInstructions)

console.log("Answer Q13.A:", countDots(firstFoldGrid))
console.log("Answer Q13.B:", separateLetters(fullFoldGrid))
