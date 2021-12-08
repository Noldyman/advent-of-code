const fs = require('fs')
const input = fs.readFileSync('./inputs/inputQ8.txt', 'utf-8')
const inputArr = input.split(/[\n|]+/).map((input) => input.trim())

let signalPatterns = []
let digitOutputs = []

const initPatternsAndOutputs = () => {
  let newSignalPatterns = []
  let newDigitOutputs = []

  inputArr.forEach((input, index) => {
    if (index % 2 === 0) newSignalPatterns.push(input)
    else newDigitOutputs.push(input)
  })

  signalPatterns = newSignalPatterns.map((item) => item.split(/[\s]+/))
  digitOutputs = newDigitOutputs.map((item) => item.split(/[\s]+/))
}

const countEasyDigits = (signalsArr) => {
  let easyDigitCount = 0

  signalsArr.forEach((signals) =>
    signals.forEach((signal) => {
      const length = signal.length
      if (length === 2 || length === 3 || length === 4 || length === 7) {
        easyDigitCount++
      }
    })
  )
  return easyDigitCount
}

initPatternsAndOutputs()

console.log('Answer Q8.A:', countEasyDigits(digitOutputs))
