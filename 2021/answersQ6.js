const fs = require('fs')
const input = fs.readFileSync('./inputs/inputQ6.txt').toString()
let fishArr = input.split(',').map(Number)

const createInitialFishCount = () => {
  let fishCount = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  fishArr.forEach((fish) => {
    fishCount[fish]++
  })

  return fishCount
}

const countFishes = (numOfDays) => {
  let fishCount = createInitialFishCount()

  for (let i = 0; i < numOfDays; i++) {
    let newFishCount = []
    fishCount.forEach((_, index) => {
      if (index === 8) {
        newFishCount.push(fishCount[0])
      } else if (index === 6) {
        newFishCount.push(fishCount[7] + fishCount[0])
      } else {
        newFishCount.push(fishCount[index + 1])
      }
    })
    fishCount = [...newFishCount]
  }

  let numOfFishes = 0

  for (let i = 0; i <= 8; i++) {
    numOfFishes += fishCount[i]
  }

  return numOfFishes
}

console.log('Anser Q6.A:', countFishes(80))
console.log('Anser Q6.B:', countFishes(256))
