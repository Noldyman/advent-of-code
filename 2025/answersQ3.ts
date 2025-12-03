import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ3.txt", "utf-8");
const banks: string[] = input.split("\n").filter((b) => !!b);

const getSumOfHighestBankVoltage = () => {
  let sum = 0;
  for (const bank of banks) {
    let firstDigit = 0;
    let firstDigitIndex = 0;

    for (let i = 0; i < bank.length - 1; i++) {
      const currNum = parseInt(bank[i]);
      if (currNum > firstDigit) {
        firstDigit = currNum;
        firstDigitIndex = i;
      }
    }

    let secondDigit = 0;
    for (let y = firstDigitIndex + 1; y < bank.length; y++) {
      const currNum = parseInt(bank[y]);
      if (currNum > secondDigit) {
        secondDigit = currNum;
      }
    }

    sum += parseInt(`${firstDigit}${secondDigit}`);
  }
  return sum;
};

console.log("Anwer to Q3A:", getSumOfHighestBankVoltage());
