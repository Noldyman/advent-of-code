const fs = require("fs")
const inputQ2 = fs.readFileSync("./inputs/inputQ2.txt").toString()
const packagesArray = inputQ2.split("\n")

let totalSquareFeetOfPaper = 0
let totalRibbonLength = 0

const computePackageDimensions = (package) => {
  let passXCount = 0
  let sizeString = ""
  let dimensions = { length: 0, width: 0, height: 0 }

  for (let i = 0; i < package.length; i++) {
    if (package[i] === "x") {
      passXCount++
      sizeString = ""
    } else {
      sizeString += package[i]

      if (passXCount < 1) {
        dimensions.length = parseInt(sizeString)
      }
      if (passXCount === 1) {
        dimensions.width = parseInt(sizeString)
      } else {
        dimensions.height = parseInt(sizeString)
      }
    }
  }

  return dimensions
}

packagesArray.forEach((package) => {
  const dimensions = computePackageDimensions(package)
  const l = dimensions.length
  const w = dimensions.width
  const h = dimensions.height
  const totalSurfaceArea = 2 * l * w + 2 * w * h + 2 * h * l

  const dimensionArr = [l, w, h]
  const ascDimensionArr = dimensionArr.sort((a, b) => a - b)

  const smallestSideArea = ascDimensionArr[0] * ascDimensionArr[1]

  const wrapRibbonLength = ascDimensionArr[0] * 2 + ascDimensionArr[1] * 2
  const bowRibbonLength = l * w * h

  totalSquareFeetOfPaper += totalSurfaceArea + smallestSideArea
  totalRibbonLength += wrapRibbonLength + bowRibbonLength
})

console.log("Needed amount of paper:", totalSquareFeetOfPaper, "square feet")
console.log("Needed amount of ribbon:", totalRibbonLength, "feet")
