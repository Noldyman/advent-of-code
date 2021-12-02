const md5 = require("md5")
const input = "ckczppom"

let lowestNumberFiveZeros
let lowestNumberSixZeros

let i = 1
while (!lowestNumberFiveZeros || !lowestNumberSixZeros) {
  const hash = md5(input + i)
  const firstFiveChar = hash.substring(0, 5)
  const firstSixChar = hash.substring(0, 6)

  if (!lowestNumberFiveZeros && firstFiveChar === "00000")
    lowestNumberFiveZeros = i
  if (!lowestNumberSixZeros && firstSixChar === "000000")
    lowestNumberSixZeros = i
  i++
}

console.log("Answer Q4.A:", lowestNumberFiveZeros)
console.log("Answer Q4.B:", lowestNumberSixZeros)
