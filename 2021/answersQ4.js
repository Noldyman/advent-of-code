const fs = require("fs")
const input = fs.readFileSync("./inputs/inputQ4.txt").toString()
const inputArr = input.split("\n\n")

const drawnNumbers = inputArr.shift().split(",").map(Number)
let boards = []
let winningBoardIndexes = []
let ScoresOfWinningBoards = []

const createBoards = () => {
  inputArr.forEach((board) => {
    const boardRowNumbers = board.split("\n").map((row) =>
      row
        .trim()
        .split(/\s{1,}/)
        .map(Number)
    )

    const boardRows = boardRowNumbers.map((row) =>
      row.map((number) => ({
        number: number,
        isMarked: false,
      }))
    )

    boards.push(boardRows)
  })
}

const markDrawnNumbers = () => {
  drawnNumbers.forEach((drawnNumber) => {
    boards.map((board) =>
      board.map((row) =>
        row.map((box) => {
          if (box.number === drawnNumber) box.isMarked = true
        })
      )
    )
    checkForWinningBoard(drawnNumber)
  })
}

const checkForWinningBoard = (drawnNumber) => {
  boards.forEach((board, boardIndex) => {
    const rowLength = 5

    for (let i = 0; i < rowLength; i++) {
      let fullColumnIsMarked = true

      board.forEach((row) => {
        if (!row[i].isMarked) fullColumnIsMarked = false
      })
      if (fullColumnIsMarked && !winningBoardIndexes.includes(boardIndex)) {
        ScoresOfWinningBoards.push(calculateScore(drawnNumber, board))
        winningBoardIndexes.push(boardIndex)
      }
    }

    board.forEach((row) => {
      let fullRowIsMarked = true

      row.forEach((box) => {
        if (!box.isMarked) fullRowIsMarked = false
      })
      if (fullRowIsMarked && !winningBoardIndexes.includes(boardIndex)) {
        ScoresOfWinningBoards.push(calculateScore(drawnNumber, board))
        winningBoardIndexes.push(boardIndex)
      }
    })
  })
}

const calculateScore = (winningNumber, winningBoard) => {
  let sumUnmarkedValues = 0

  winningBoard.forEach((row) => {
    row.forEach((box) => {
      if (!box.isMarked) sumUnmarkedValues += box.number
    })
  })
  return winningNumber * sumUnmarkedValues
}

createBoards()
markDrawnNumbers()

console.log("Answer Q4.A:", ScoresOfWinningBoards[0])
console.log(
  "Answer Q4.B:",
  ScoresOfWinningBoards[ScoresOfWinningBoards.length - 1]
)
