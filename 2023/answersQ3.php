<?php
$input = file_get_contents('./inputs/inputQ3.txt');
$lines = explode("\n", $input);

function getSymbolIndex($symbol)
{
    return intval($symbol[1]);
}
function getSymbolMatchIndexes(string $line)
{
    if (!$line)
        return [];
    preg_match_all("/(?![0-9]|\.)./", $line, $matches, PREG_OFFSET_CAPTURE);
    return array_map('getSymbolIndex', $matches[0]);
}

function numberIsAdjecentToSymbol(int $startIndex, int $endIndex, array $symbolIndexes)
{
    if (count($symbolIndexes) == 0)
        return false;
    $isAdjecent = false;
    foreach ($symbolIndexes as $index) {
        if ($isAdjecent)
            continue;
        if ($index >= $startIndex - 1 && $index <= $endIndex + 1)
            $isAdjecent = true;
    }
    return $isAdjecent;
}

function getSumOfPartNumbers($lines)
{
    $sumOfPartNumbers = 0;

    for ($i = 0; $i < count($lines); $i++) {
        $line = $lines[$i];
        preg_match_all("/[0-9]+/", $line, $matches, PREG_OFFSET_CAPTURE);

        $symbolIndexesCurrentLine = getSymbolMatchIndexes($line);
        $symbolIndexesPreviousLine = getSymbolMatchIndexes($lines[$i - 1] ?? "");
        $symbolIndexesNextLine = getSymbolMatchIndexes($lines[$i + 1] ?? "");

        foreach ($matches[0] as $match) {
            $number = intval($match[0]);
            $startIndex = $match[1];
            $endIndex = $startIndex + strlen($number) - 1;

            $isAdjecentCurrLine = numberIsAdjecentToSymbol($startIndex, $endIndex, $symbolIndexesCurrentLine);
            $isAdjecentPrevLine = numberIsAdjecentToSymbol($startIndex, $endIndex, $symbolIndexesPreviousLine);
            $isAdjecentNextLine = numberIsAdjecentToSymbol($startIndex, $endIndex, $symbolIndexesNextLine);

            if ($isAdjecentCurrLine || $isAdjecentPrevLine || $isAdjecentNextLine) {
                $sumOfPartNumbers += $number;
            }
        }
    }

    return $sumOfPartNumbers;
}

function mapNumberPositions($number)
{
    return [$number[1], intval($number[1]) + strlen($number[0]) - 1, intval($number[0])];
}

function getNumberPositions($line)
{
    preg_match_all("/[0-9]+/", $line, $matches, PREG_OFFSET_CAPTURE);
    return array_map('mapNumberPositions', $matches[0]);
}

function getSumOfGearRatios($lines)
{
    $sumOfGearRatios = 0;

    for ($i = 0; $i < count($lines); $i++) {
        preg_match_all("/\*/", $lines[$i], $gearMatches, PREG_OFFSET_CAPTURE);
        $gearIndexes = array_map('getSymbolIndex', $gearMatches[0]);
        if (count($gearIndexes) == 0)
            continue;

        $numberPosCurrLine = getNumberPositions($lines[$i]);
        $numberPosPrevLine = getNumberPositions($lines[$i - 1] ?? "");
        $numberPosNextLine = getNumberPositions($lines[$i + 1] ?? "");

        foreach ($gearIndexes as $gearIndex) {
            $adjecentNumbers = [];

            foreach ($numberPosCurrLine as $numIndexes) {
                if ($gearIndex >= $numIndexes[0] - 1 && $gearIndex <= $numIndexes[1] + 1) {
                    $adjecentNumbers[] = $numIndexes[2];
                }
            }
            foreach ($numberPosPrevLine as $numIndexes) {
                if ($gearIndex >= $numIndexes[0] - 1 && $gearIndex <= $numIndexes[1] + 1) {
                    $adjecentNumbers[] = $numIndexes[2];
                }
            }
            foreach ($numberPosNextLine as $numIndexes) {
                if ($gearIndex >= $numIndexes[0] - 1 && $gearIndex <= $numIndexes[1] + 1) {
                    $adjecentNumbers[] = $numIndexes[2];
                }
            }

            if (count($adjecentNumbers) == 2) {
                $sumOfGearRatios += ($adjecentNumbers[0] * $adjecentNumbers[1]);
            }
        }
    }

    return $sumOfGearRatios;
}

$sumOfPartNumbers = getSumOfPartNumbers($lines);
$sumOfGearRatios = getSumOfGearRatios($lines);

print "Answer to Q3A: " . $sumOfPartNumbers . "\n";
print "Answer to Q3B: " . $sumOfGearRatios . "\n";