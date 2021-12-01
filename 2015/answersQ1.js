const fs = require("fs")
const instructions = fs.readFileSync("./inputs/inputQ1.txt").toString()

let floor = 0
let hasBeenToBasement = false
let firstTimeBasement = 0

for (let i = 0; i < instructions.length; i++) {
  if (instructions[i] === "(") {
    floor++
  }
  if (instructions[i] === ")") {
    if (floor === 0 && !hasBeenToBasement) {
      firstTimeBasement = i + 1
      hasBeenToBasement = true
    }
    floor--
  }
}

console.log("The instructions lead to floor:", floor)
console.log("Instruction", firstTimeBasement, "leads to the basement first.")
