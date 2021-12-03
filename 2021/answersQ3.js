const fs = require("fs")
const input = fs.readFileSync("./inputs/inputQ3.txt").toString()
const inputArr = input.split("\n").map((input) => input.trim())

const bits = inputArr[0].length
let gammaRate = ""
let epsilonRate = ""

let oxygenGenRating = [...inputArr]
let CO2ScrubberRating = [...inputArr]

let i = 0
while (i < bits) {
  let zeroBitCount = 0
  let oneBitCount = 0

  inputArr.forEach((input) => {
    if (input[i] === "0") zeroBitCount++
    else oneBitCount++
  })

  if (zeroBitCount > oneBitCount) {
    gammaRate += "0"
    epsilonRate += "1"
  } else {
    gammaRate += "1"
    epsilonRate += "0"
  }

  if (oxygenGenRating.length > 1) {
    let zeroBitCountOxygenRate = 0
    let oneBitCountOxygenRate = 0

    oxygenGenRating.forEach((input) => {
      if (input[i] === "0") zeroBitCountOxygenRate++
      else oneBitCountOxygenRate++
    })

    const OxygenValueToKeep =
      zeroBitCountOxygenRate <= oneBitCountOxygenRate ? "1" : "0"
    oxygenGenRating = oxygenGenRating.filter(
      (input) => input[i] === OxygenValueToKeep
    )
  }

  if (CO2ScrubberRating.length > 1) {
    let zeroBitCountCO2Rate = 0
    let oneBitCountCO2Rate = 0

    CO2ScrubberRating.forEach((input) => {
      if (input[i] === "0") zeroBitCountCO2Rate++
      else oneBitCountCO2Rate++
    })

    const CO2ValueToKeep = oneBitCountCO2Rate >= zeroBitCountCO2Rate ? "0" : "1"
    CO2ScrubberRating = CO2ScrubberRating.filter(
      (input) => input[i] === CO2ValueToKeep
    )
  }

  i++
}

const binaryToDecimal = (binaryNumber) => {
  let decimalValue = 0

  for (let i = binaryNumber.length - 1; i >= 0; i--) {
    const bitValue = Math.pow(2, binaryNumber.length - (i + 1))

    if (binaryNumber[i] === "1") decimalValue += bitValue
  }

  return decimalValue
}

const powerConsumption =
  binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate)
const lifeSupportRating =
  binaryToDecimal(oxygenGenRating[0]) * binaryToDecimal(CO2ScrubberRating[0])

console.log("Answer 2021-Q3.A:", powerConsumption)
console.log("Answer 2021-Q3.B:", lifeSupportRating)
