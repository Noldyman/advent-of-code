const fs = require("fs")
const input = fs.readFileSync("./inputs/inputQ14.txt", "utf-8").split("\n")
const template = input.shift()
const rules = input.filter((r) => r !== "").map((r) => r.split(" -> "))

const getInitialCounts = (template) => {
  let monomers = []
  let monomerCount = []
  let dimers = []
  let dimerCount = []

  for (let i = 0; i < template.length; i++) {
    const monomerIndex = monomers.findIndex((mon) => mon === template[i])

    if (monomerIndex < 0) {
      monomers.push(template[i])
      monomerCount.push(1)
    } else {
      monomerCount[monomerIndex]++
    }

    if (i < template.length - 1) {
      const currDimer = template[i] + template[i + 1]
      const dimerIndex = dimers.findIndex((dim) => dim === currDimer)

      if (dimerIndex < 0) {
        dimers.push(currDimer)
        dimerCount.push(1)
      } else {
        dimerCount[dimerIndex]++
      }
    }
  }
  return { monomers, monomerCount, dimers, dimerCount }
}

const polymerizeAndCount = (numOfSteps) => {
  const initialCounts = getInitialCounts(template)
  let monomers = [...initialCounts.monomers]
  let monomerCount = [...initialCounts.monomerCount]
  let dimers = [...initialCounts.dimers]
  let dimerCount = [...initialCounts.dimerCount]

  for (let i = 0; i < numOfSteps; i++) {
    let newDimersArr = []
    let newDimerCountArr = []

    dimers.forEach((currDim, dimI) => {
      const rule = rules.find((rule) => rule[0] === currDim)

      const currDimCount = dimerCount[dimI]
      const newMonomer = rule[1]
      const newDimer1 = currDim[0] + newMonomer
      const newDimer2 = newMonomer + currDim[1]

      const newMonomerIndex = monomers.findIndex((mon) => mon === newMonomer)
      if (newMonomerIndex < 0) {
        monomers.push(newMonomer)
        monomerCount.push(currDimCount)
      } else {
        monomerCount[newMonomerIndex] += currDimCount
      }

      const newDimer1Index = newDimersArr.findIndex((dim) => dim === newDimer1)
      if (newDimer1Index < 0) {
        newDimersArr.push(newDimer1)
        newDimerCountArr.push(currDimCount)
      } else {
        newDimerCountArr[newDimer1Index] += currDimCount
      }

      const newDimer2Index = newDimersArr.findIndex((dim) => dim === newDimer2)
      if (newDimer2Index < 0) {
        newDimersArr.push(newDimer2)
        newDimerCountArr.push(currDimCount)
      } else {
        newDimerCountArr[newDimer2Index] += currDimCount
      }
    })
    monomers = [...monomers]
    monomerCount = [...monomerCount]
    dimers = [...newDimersArr]
    dimerCount = [...newDimerCountArr]
  }

  monomerCount.sort((a, b) => a - b)
  const lowest = monomerCount.shift()
  const highest = monomerCount.pop()

  return highest - lowest
}

console.log("Answer Q14.A:", polymerizeAndCount(10))
console.log("Answer Q14.B:", polymerizeAndCount(40))
