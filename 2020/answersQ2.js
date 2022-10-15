const fs = require("fs");
const input = fs.readFileSync("./inputs/inputQ2.txt", "utf-8");
const inputLines = input.split("\n");

const countValidPwds = () => {
  let validPwdsCountA = 0;
  let validPwdsCountB = 0;
  inputLines.forEach((line) => {
    const splitLine = line.split(":");
    const passwords = splitLine.filter((item, i) => i % 2 !== 0);
    const policies = splitLine.filter((item, i) => i % 2 === 0);

    policies.forEach((policy, ind) => {
      const pwd = passwords[ind].trim();
      const splitPolicy = policy.split(" ");
      const policyLetter = splitPolicy[1];
      const policyRange = splitPolicy[0].split("-").map(Number);
      let letterCount = 0;
      let policyLetterIndexes = [];

      for (let i = 0; i < pwd.length; i++) {
        if (pwd[i] === policyLetter) {
          letterCount += 1;
          policyLetterIndexes.push(i + 1);
        }
      }

      if (letterCount >= policyRange[0] && letterCount <= policyRange[1])
        validPwdsCountA += 1;

      if (
        (policyLetterIndexes.includes(policyRange[0]) &&
          !policyLetterIndexes.includes(policyRange[1])) ||
        (!policyLetterIndexes.includes(policyRange[0]) &&
          policyLetterIndexes.includes(policyRange[1]))
      )
        validPwdsCountB += 1;
    });
  });

  console.log("Answer to Q2A:", validPwdsCountA);
  console.log("Answer to Q2B:", validPwdsCountB);
};

countValidPwds();
