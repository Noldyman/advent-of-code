const fs = require('fs')
const inputArr = fs.readFileSync('./inputs/inputQ2.txt').toString().split('\n')

let directions = []

directions = inputArr.map((d) => {
  const instruction = d.split(' ')
  return { direction: instruction[0], unit: parseInt(instruction[1]) }
})

let horizontalPos = 0
let depth = 0
let aim = 0
let aimDepth = 0

directions.forEach((d) => {
  switch (d.direction) {
    case 'forward':
      horizontalPos += d.unit
      aimDepth += aim * d.unit
      break
    case 'down':
      depth += d.unit
      aim += d.unit
      break
    case 'up':
      depth -= d.unit
      aim -= d.unit
      break
  }
})

console.log('Answer Q2.A:', depth * horizontalPos)
console.log('Answer Q2.B:', aimDepth * horizontalPos)
