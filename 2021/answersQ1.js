const fs = require("fs")
const input = fs.readFileSync("./inputs/inputQ1.txt").toString()
const depthMeasurements = input.split("\n").map(Number)

let numberOfIncreases = 0
let sumOfThreeDepthMeasurements = []
let numberOfSumOfThreeIncreases = 0

for (let i = 1; i < depthMeasurements.length; i++) {
  if (depthMeasurements[i] > depthMeasurements[i - 1]) numberOfIncreases++
  if (i > 1) {
    const sumOfThree =
      depthMeasurements[i] + depthMeasurements[i - 1] + depthMeasurements[i - 2]
    sumOfThreeDepthMeasurements.push(sumOfThree)
  }
}

for (let i = 1; i < sumOfThreeDepthMeasurements.length; i++) {
  if (sumOfThreeDepthMeasurements[i] > sumOfThreeDepthMeasurements[i - 1])
    numberOfSumOfThreeIncreases++
}

console.log("The depth measurement increases", numberOfIncreases, "times.")
console.log(
  numberOfSumOfThreeIncreases,
  "sums-of-three's are larger than their previous sums-of-three"
)
