<?php
$input = file_get_contents('./inputs/inputQ4.txt');
$range = array_map('intval', explode('-', $input));

function getNumberOfValidCodes()
{
    global $range;
    $numberOfValidCodesByFirstCriteria = 0;
    $numberOfValidCodesBySecondCriteria = 0;

    for ($code = $range[0]; $code <= $range[1]; $code++) {
        $codeString = (string) $code;
        $isAlWaysIncreasing = true;
        $hasDuplicateDigit = false;
        $duplicatesAreNotPartOfLargerGroup = false;

        for ($i = 1; $i < strlen($codeString); $i++) {
            if ((int) $codeString[$i] < (int) $codeString[$i - 1]) {
                $isAlWaysIncreasing = false;
            }
            if ($codeString[$i] === $codeString[$i - 1]) {
                $hasDuplicateDigit = true;

                if ($codeString[$i] !== $codeString[$i - 2] && ($i === 5 || $codeString[$i] !== $codeString[$i + 1])) {
                    $duplicatesAreNotPartOfLargerGroup = true;
                }

            }
        }

        if ($isAlWaysIncreasing && $hasDuplicateDigit) {
            $numberOfValidCodesByFirstCriteria += 1;
            if ($duplicatesAreNotPartOfLargerGroup) {
                $numberOfValidCodesBySecondCriteria += 1;
            }
        }
    }

    return [$numberOfValidCodesByFirstCriteria, $numberOfValidCodesBySecondCriteria];
}

[$numberOfValidCodesByFirstCriteria, $numberOfValidCodesBySecondCriteria] = getNumberOfValidCodes();

print "Answer to Q4A: " . (string) $numberOfValidCodesByFirstCriteria . "\n";
print "Answer to Q4B: " . (string) $numberOfValidCodesBySecondCriteria . "\n";