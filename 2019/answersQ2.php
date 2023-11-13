<?php
$input = file_get_contents('./inputs/inputQ2.txt');
$initialIntegers = array_map('intval', explode(",", $input));

function runProgram(int $nuon, int $verb)
{
    global $initialIntegers;
    $integers = $initialIntegers;
    $integers[1] = $nuon;
    $integers[2] = $verb;

    $haltProgram = false;
    $position = 0;

    while (!$haltProgram && $position <= count($integers)) {
        $opCode = $integers[$position];

        if ($opCode == 99) {
            $haltProgram = true;
        }

        $posOne = $integers[$position + 1];
        $posTwo = $integers[$position + 2];
        $outputPos = $integers[$position + 3];

        switch ($opCode) {
            case 1:
                $sum = $integers[$posOne] + $integers[$posTwo];
                $integers[$outputPos] = $sum;
                break;
            case 2:
                $product = $integers[$posOne] * $integers[$posTwo];
                $integers[$outputPos] = $product;
                break;
        }

        $position += 4;
    }

    return $integers[0];
}

function findTargetParameters()
{
    $targetOutput = 19690720;

    for ($nuon = 0; $nuon < 100; $nuon++) {
        for ($verb = 0; $verb < 100; $verb++) {
            $output = runProgram($nuon, $verb);
            if ($output == $targetOutput)
                return 100 * $nuon + $verb;
        }
    }
}

$output = runProgram(12, 2);
$targetParameters = findTargetParameters();

print "Answer to Q2A: " . $output . "\n";
print "Answer to Q2B: " . $targetParameters;
