const fs = require("fs")
const input = fs.readFileSync("./inputs/inputQ8.txt", "utf-8")
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

const mapSignalWiring = () => {
  const letterIndex = "abcdefg"
  let wiringArr = []

  signalPatterns.forEach((signals) => {
    let wiring = ["", "", "", "", "", "", ""]

    one = signals.filter((s) => s.length == 2)[0]
    seven = signals.filter((s) => s.length == 3)[0]
    fiveDigits = signals.filter((s) => s.length == 5)
    sixDigits = signals.filter((s) => s.length == 6)

    for (let i = 0; i < 3; i++) {
      if (!one.includes(seven[i])) {
        wiring[0] = seven[i]
        break
      }
    }

    let fiveAndSixDigitWiresArr = []
    for (let i = 0; i < 6; i++) {
      if (i < 5) {
        fiveDigits.forEach((digit) => {
          fiveAndSixDigitWiresArr.push(digit[i])
        })
      }
      sixDigits.forEach((digit) => {
        fiveAndSixDigitWiresArr.push(digit[i])
      })
    }
    const fiveAndSixDigitWireCount = countWires(fiveAndSixDigitWiresArr)
    fiveAndSixDigitWireCount.forEach((count, index) => {
      if (count === 6 && letterIndex[index] !== wiring[0]) {
        wiring[6] = letterIndex[index]
      }
    })

    let totalWiresArr = []
    const splittedDigits = signals.map((digit) => digit.split(""))
    splittedDigits.forEach(
      (digit) => (totalWiresArr = [...totalWiresArr, ...digit])
    )
    const totalWireCount = countWires(totalWiresArr)
    totalWireCount.forEach((count, index) => {
      switch (count) {
        case 4:
          wiring[4] = letterIndex[index]
          break
        case 6:
          wiring[1] = letterIndex[index]
          break
        case 7:
          if (letterIndex[index] !== wiring[6]) wiring[3] = letterIndex[index]
          break
        case 8:
          if (letterIndex[index] !== wiring[0]) wiring[2] = letterIndex[index]
          break
        case 9:
          wiring[5] = letterIndex[index]
          break
      }
    })
    wiringArr.push([...wiring])
  })
  return wiringArr
}

const countWires = (wiresArr) => {
  wireCount = [0, 0, 0, 0, 0, 0, 0]
  wiresArr.forEach((wire) => {
    switch (wire) {
      case "a":
        wireCount[0]++
        break
      case "b":
        wireCount[1]++
        break
      case "c":
        wireCount[2]++
        break
      case "d":
        wireCount[3]++
        break
      case "e":
        wireCount[4]++
        break
      case "f":
        wireCount[5]++
        break
      case "g":
        wireCount[6]++
        break
    }
  })
  return wireCount
}

const computeAndAddUpOutputs = () => {
  let totalOutputValue = 0
  const wiring = mapSignalWiring()

  digitOutputs.forEach((digits, index) => {
    let outputValue = ""

    digits.forEach((digit) => {
      switch (digit.length) {
        case 2:
          outputValue += "1"
          break
        case 3:
          outputValue += "7"
          break
        case 4:
          outputValue += "4"
          break
        case 7:
          outputValue += "8"
          break
        case 5:
          if (!digit.includes(wiring[index][2])) outputValue += "5"
          else if (!digit.includes(wiring[index][5])) outputValue += "2"
          else outputValue += "3"
          break
        case 6:
          if (!digit.includes(wiring[index][2])) outputValue += "6"
          else if (!digit.includes(wiring[index][4])) outputValue += "9"
          else outputValue += "0"
          break
      }
    })
    totalOutputValue += parseInt(outputValue)
  })
  return totalOutputValue
}

initPatternsAndOutputs()
mapSignalWiring()

console.log("Answer Q8.A:", countEasyDigits(digitOutputs))
console.log("Answer Q8.B:", computeAndAddUpOutputs())
