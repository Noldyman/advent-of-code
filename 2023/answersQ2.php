<?php
$input = file_get_contents('./inputs/inputQ2.txt');
$lines = explode("\n", $input);

function formatGames($lines)
{
    $games = [];
    foreach ($lines as $line) {
        $splitInput = explode(':', $line);
        preg_match("/[0-9]+/", $splitInput[0], $matches);
        $gameNumber = $matches[0];

        $rounds = [];
        $roundsStr = explode(";", $splitInput[1]);
        foreach ($roundsStr as $round) {
            $cubes = [];
            $cubesStr = explode(",", $round);
            foreach ($cubesStr as $cube) {
                $cubeInfo = explode(" ", trim($cube));
                $cubes[$cubeInfo[1]] = intval($cubeInfo[0]);
            }
            $rounds[] = $cubes;
        }

        $games[$gameNumber] = $rounds;
    }
    return $games;
}

function getSumOfValidGameIds($games)
{
    $sumOfValidGames = 0;
    $numOfCubes = array(
        'red' => 12,
        'green' => 13,
        'blue' => 14,
    );

    foreach ($games as $gameNumber => $rounds) {
        $gameIsValid = true;

        foreach ($rounds as $round) {
            if (!$gameIsValid)
                continue;

            foreach ($round as $cube => $amount) {
                if (!$gameIsValid)
                    continue;

                if ($numOfCubes[$cube] < $amount) {
                    $gameIsValid = false;
                }
            }
        }

        if ($gameIsValid) {
            $sumOfValidGames += $gameNumber;
        }
    }

    return $sumOfValidGames;
}

function getSumOfCubePower($games)
{
    $sumOfCubePower = 0;

    foreach ($games as $rounds) {
        $minimalNumOfCubes = array(
            'red' => 0,
            'green' => 0,
            'blue' => 0,
        );

        foreach ($rounds as $round) {
            foreach ($round as $cube => $amount) {
                if ($minimalNumOfCubes[$cube] < $amount) {
                    $minimalNumOfCubes[$cube] = $amount;
                }
            }
        }

        $sumOfCubePower += $minimalNumOfCubes['red'] * $minimalNumOfCubes['green'] * $minimalNumOfCubes['blue'];
    }

    return $sumOfCubePower;
}

$games = formatGames($lines);
$sumOfValidGameIds = getSumOfValidGameIds($games);
$sumOfCubePower = getSumOfCubePower($games);

print "Answer to Q1A: " . $sumOfValidGameIds . "\n";
print "Answer to Q1B: " . $sumOfCubePower . "\n";