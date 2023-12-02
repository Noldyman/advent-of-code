<?php
$input = file_get_contents('./inputs/inputQ1.txt');
$lines = explode("\n", $input);

function getCalibrationValues($lines, bool $includeWrittenNumbers = false)
{
    $sumOfCalibrationValues = 0;

    if ($includeWrittenNumbers) {
        $writtenNumbers = array(
            "one" => "1",
            "two" => "2",
            "three" => "3",
            "four" => "4",
            "five" => "5",
            "six" => "6",
            "seven" => "7",
            "eight" => "8",
            "nine" => "9",
        );

        foreach ($lines as $line) {
            $lineCopy = $line;
            foreach ($writtenNumbers as $key => $value) {
                $lineCopy = str_replace($key, $key . $value . $key, $lineCopy);
            }

            preg_match_all("/[1-9]/", $lineCopy, $matches);
            $calValueStr = $matches[0][0] . end($matches[0]);
            $sumOfCalibrationValues += intval($calValueStr);
        }
    } else {
        foreach ($lines as $line) {
            preg_match_all("/[1-9]/", $line, $matches);
            $calValueStr = $matches[0][0] . end($matches[0]);
            $sumOfCalibrationValues += intval($calValueStr);
        }
    }

    return $sumOfCalibrationValues;
}

$calibrationValueSum = getCalibrationValues($lines);
$calibrationValueSumIncludingWrittenNumbers = getCalibrationValues($lines, true);

print "Answer to Q1A is: " . $calibrationValueSum . "\n";
print "Answer to Q1B is: " . $calibrationValueSumIncludingWrittenNumbers;