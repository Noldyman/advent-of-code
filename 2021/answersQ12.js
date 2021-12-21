const fs = require("fs")
const inputArr = fs.readFileSync("./inputs/inputQ12.txt", "utf-8").split("\n")
const connectionsArr = inputArr.map((input) => input.split("-"))

const mapCaves = () => {
  let caves = []
  let existingCaveNames = []
  connectionsArr.forEach((connection) => {
    let i = 0
    while (i < 2) {
      const connectedCaveIndex = i < 1 ? 1 : 0
      let cave = { caveName: "", caveIsBig: false, connectedCaves: [] }
      if (!existingCaveNames.includes(connection[i])) {
        cave.caveName = connection[i]
        if (connection[i] === connection[i].toUpperCase()) {
          cave.caveIsBig = true
        }
        cave.connectedCaves.push(connection[connectedCaveIndex])
        caves.push(cave)
        existingCaveNames.push(connection[i])
      } else {
        const caveIndex = caves.findIndex(
          (cave) => cave.caveName === connection[i]
        )
        caves[caveIndex].connectedCaves.push(connection[connectedCaveIndex])
      }
      i++
    }
  })
  return caves
}

const checkIfContainsDuplicateSmallCaves = (path) => {
  const smallCaves = path.filter(
    (caveName) => caveName === caveName.toLowerCase()
  )
  const duplicates = smallCaves.filter(
    (item, index) => smallCaves.indexOf(item) !== index
  )
  if (duplicates.length > 0) return true
  return false
}

const checkIfPathIsFinished = (path) => {
  if (path[path.length - 1] === "end") return true
  return false
}

const findValidPaths = (isQuestionB) => {
  let testingPaths = [["start"]]
  let validPaths = []

  while (testingPaths.length > 0) {
    let newTestingPaths = []
    testingPaths.forEach((testingPath) => {
      const lastCaveName = testingPath[testingPath.length - 1]
      const lastCave = caves.find((cave) => cave.caveName === lastCaveName)

      lastCave.connectedCaves.forEach((connectedCave) => {
        let newPath = [...testingPath]
        const currentCave = caves.find(
          (cave) => cave.caveName === connectedCave
        )

        if (!isQuestionB) {
          if (currentCave.caveIsBig || !newPath.includes(connectedCave)) {
            newPath.push(connectedCave)
          } else return
        } else {
          if (currentCave.caveIsBig || !newPath.includes(connectedCave)) {
            newPath.push(connectedCave)
          } else if (newPath.includes(connectedCave)) {
            if (
              !checkIfContainsDuplicateSmallCaves(newPath) &&
              connectedCave !== "start" &&
              connectedCave !== "end"
            ) {
              newPath.push(connectedCave)
            } else return
          } else return
        }

        if (checkIfPathIsFinished(newPath)) {
          validPaths.push(newPath)
        } else {
          newTestingPaths.push(newPath)
        }
      })
    })
    testingPaths = [...newTestingPaths]
  }
  return validPaths
}
const caves = mapCaves()
const validPathsA = findValidPaths(false)
const validPathsB = findValidPaths(true)

console.log("Answer Q12-A:", validPathsA.length)
console.log("Answer Q12-B:", validPathsB.length)
