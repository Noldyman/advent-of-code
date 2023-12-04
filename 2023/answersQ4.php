<?php
$input = file_get_contents('./inputs/inputQ4.txt');

function formatPuzzleInput($input)
{
    $games = [];
    $lines = explode("\n", $input);

    foreach ($lines as $line) {
        $game = explode(": ", $line);
        $numbers = preg_split("/ +\| +/", $game[1]);
        $winningNumners = array_map('intval', preg_split("/ +/", $numbers[0]));
        $gameNumbers = array_map('intval', preg_split("/ +/", $numbers[1]));

        $games[] = ['winningNumners' => $winningNumners, 'gameNumbers' => $gameNumbers];
    }

    return $games;
}

function processGames($games)
{
    $totalPoints = 0;
    $totalNumberOfScratchCards = 0;
    $gameCopies = [];

    for ($i = 0; $i < count($games); $i++) {
        $gameNumbers = $games[$i]['gameNumbers'];
        $winningNumbers = $games[$i]['winningNumners'];
        $numOfWinningNumbers = 0;

        foreach ($gameNumbers as $gameNumber) {
            if (in_array($gameNumber, $winningNumbers)) {
                $numOfWinningNumbers += 1;
            }
        }

        if ($numOfWinningNumbers > 0) {
            $totalPoints += pow(2, $numOfWinningNumbers - 1);
        }

        $numOfCoppies = 1;
        $hasExtraCopies = array_key_exists($i, $gameCopies);
        if ($hasExtraCopies) {
            $numOfCoppies += $gameCopies[$i];
        }

        for ($ind = 0; $ind < $numOfCoppies; $ind++) {
            $totalNumberOfScratchCards += 1;

            if ($numOfWinningNumbers > 0) {
                for ($index = 1; $index <= $numOfWinningNumbers; $index++) {
                    if (array_key_exists($i + $index, $gameCopies)) {
                        $gameCopies[$i + $index] += 1;
                    } else {
                        $gameCopies[$i + $index] = 1;
                    }
                }
            }
        }
    }

    return [$totalPoints, $totalNumberOfScratchCards];
}

$games = formatPuzzleInput($input);
[$totalPoints, $totalNumberOfScratchCards] = processGames($games);

print "Answer to Q4A is: " . $totalPoints . "\n";
print "Answer to Q4B is: " . $totalNumberOfScratchCards . "\n";