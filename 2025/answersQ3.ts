import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ3.txt", "utf-8");
const banks: string[] = input.split("\n").filter((b) => !!b);

const getJoltage = (numOfBatteries: number) => {
  let sum = 0;
  for (const bank of banks) {
    let digits = "";
    let startIndex = 0;

    while (digits.length < numOfBatteries) {
      const remainingLength = numOfBatteries - digits.length;
      let newDigit = 0;

      for (let i = startIndex; i <= bank.length - remainingLength; i++) {
        const currNum = parseInt(bank[i]);
        if (currNum > newDigit) {
          newDigit = currNum;
          startIndex = i + 1;
        }
      }
      digits += newDigit.toString();
    }
    sum += parseInt(digits);
  }
  return sum;
};

console.log("Anwer to Q3A:", getJoltage(2));
console.log("Anwer to Q3B:", getJoltage(12));
