const fs = require("fs")
const input = fs.readFileSync("./inputs/inputQ10.txt", "utf-8")
const inputArr = input.split("\n")

let uncorruptedChunks = []

const findIncorrectClosingTags = (inputArr) => {
  let incorrectClosingTags = ""

  inputArr.forEach((chunk) => {
    let chunkIsCorrupted = false
    let chunkArr = []

    for (let i = 0; i < chunk.length; i++) {
      const lastCharI = chunkArr.length - 1
      switch (chunk[i]) {
        case "(":
          chunkArr.push("(")
          break
        case "{":
          chunkArr.push("{")
          break
        case "[":
          chunkArr.push("[")
          break
        case "<":
          chunkArr.push("<")
          break
        case ")":
          if (chunkArr[lastCharI] !== "(") {
            incorrectClosingTags += ")"
            chunkIsCorrupted = true
            return
          } else {
            chunkArr.pop()
          }
          break
        case "}":
          if (chunkArr[lastCharI] !== "{") {
            incorrectClosingTags += "}"
            chunkIsCorrupted = true
            return
          } else {
            chunkArr.pop()
          }
          break
        case "]":
          if (chunkArr[lastCharI] !== "[") {
            incorrectClosingTags += "]"
            chunkIsCorrupted = true
            return
          } else {
            chunkArr.pop()
          }
          break
        case ">":
          if (chunkArr[lastCharI] !== "<") {
            incorrectClosingTags += ">"
            chunkIsCorrupted = true
            return
          } else {
            chunkArr.pop()
          }
          break
      }
    }
    if (!chunkIsCorrupted) uncorruptedChunks.push(chunkArr)
  })
  return incorrectClosingTags
}

const calcErrorScore = (inputArr) => {
  let errorScore = 0
  const incorrectClosingTags = findIncorrectClosingTags(inputArr)
  const bracketScore = 3
  const curlyBracketScore = 1197
  const squareBracketScore = 57
  const angleBracketScore = 25137

  for (let i = 0; i < incorrectClosingTags.length; i++) {
    switch (incorrectClosingTags[i]) {
      case ")":
        errorScore += bracketScore
        break
      case "}":
        errorScore += curlyBracketScore
        break
      case "]":
        errorScore += squareBracketScore
        break
      case ">":
        errorScore += angleBracketScore
        break
    }
  }
  return errorScore
}

const finishChuncks = () => {
  let closingChunks = []

  uncorruptedChunks.forEach((chunkArr) => {
    let closingTags = ""
    chunkArr.reverse()
    chunkArr.forEach((tag) => {
      switch (tag) {
        case "(":
          closingTags += ")"
          break
        case "{":
          closingTags += "}"
          break
        case "[":
          closingTags += "]"
          break
        case "<":
          closingTags += ">"
          break
      }
    })
    closingChunks.push(closingTags)
  })
  return closingChunks
}

const calcClosingScore = () => {
  const closingChunks = finishChuncks()
  let chunkPointsArr = []

  closingChunks.forEach((chunk) => {
    let chunkpoints = 0
    for (let i = 0; i < chunk.length; i++) {
      chunkpoints *= 5
      switch (chunk[i]) {
        case ")":
          chunkpoints += 1
          break
        case "]":
          chunkpoints += 2
          break
        case "}":
          chunkpoints += 3
          break
        case ">":
          chunkpoints += 4
          break
      }
    }
    chunkPointsArr.push(chunkpoints)
  })
  chunkPointsArr.sort((a, b) => a - b)
  const middleIndex = (chunkPointsArr.length - 1) / 2
  return chunkPointsArr[middleIndex]
}

console.log("Answer Q10.A:", calcErrorScore(inputArr))
console.log("Answer Q10.B", calcClosingScore())
