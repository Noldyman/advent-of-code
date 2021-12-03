const fs = require("fs")
const stringArr = fs.readFileSync("./inputs/inputQ5.txt").toString().split("\n")

let niceStringCount1 = 0
let niceStringCount2 = 0

const requiredVowels = "aeiou"
const forbiddenStrings = ["ab", "cd", "pq", "xy"]

stringArr.forEach((string) => {
  let requiredVowelCount = 0
  let containsDoubleLetters = false
  let containsForbiddenString = false

  for (let i = 0; i < string.length; i++) {
    if (requiredVowels.includes(string[i])) requiredVowelCount++
    if (string[i] === string[i - 1]) containsDoubleLetters = true
    if (forbiddenStrings.includes(string[i - 1] + string[i]))
      containsForbiddenString = true
  }

  if (
    requiredVowelCount >= 3 &&
    containsDoubleLetters &&
    !containsForbiddenString
  )
    niceStringCount1++
})

stringArr.forEach((string) => {
  let containsReoccurringPair = false
  let containsRepeatingLetter = false

  let letterPairs = []
  for (let i = 0; i < string.length; i++) {
    if (i > 0) {
      const currentPair = string[i - 1] + string[i]
      const lastPair = string[i - 2] + string[i - 1]
      const letterPairsWithoutLastPair = letterPairs.slice(
        0,
        letterPairs.length - 1
      )

      if (
        letterPairsWithoutLastPair.includes(currentPair) &&
        currentPair !== lastPair
      )
        containsReoccurringPair = true

      letterPairs.push(currentPair)
    }
    if (string[i] === string[i - 2]) containsRepeatingLetter = true
  }

  if (containsReoccurringPair && containsRepeatingLetter) niceStringCount2++
})

console.log("Answer Q5.A:", niceStringCount1)
console.log("Answer Q5.B:", niceStringCount2)
