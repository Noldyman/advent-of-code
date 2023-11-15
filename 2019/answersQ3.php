<?php
$input = file_get_contents('./inputs/inputQ3.txt');
$splitInput = explode("\n", $input);

function splitInstruction(string $instruction)
{
    $direction = $instruction[0];
    $distance = intval(ltrim($instruction, $instruction[0]));
    return (array) [
        "direction" => $direction,
        "distance" => $distance
    ];
}

$instructionsWireOne = array_map('splitInstruction', explode(",", $splitInput[0]));
$instructionsWireTwo = array_map('splitInstruction', explode(",", $splitInput[1]));

function getLocationsArray(array $instructions)
{
    $locations = [];

    $xPos = 0;
    $yPos = 0;

    foreach ($instructions as $instruction) {
        for ($i = 0; $i < $instruction['distance']; $i++) {
            switch ($instruction['direction']) {
                case 'U':
                    $yPos += 1;
                    break;
                case 'R':
                    $xPos += 1;
                    break;
                case 'D':
                    $yPos -= 1;
                    break;
                default:
                    $xPos -= 1;
            }
            $locations[] = (string) $xPos . "," . $yPos;
        }
    }
    return $locations;
}

function getIntersectionInfo()
{
    global $instructionsWireOne, $instructionsWireTwo;

    $locationsWireOne = getLocationsArray($instructionsWireOne);
    $locationsWireTwo = getLocationsArray($instructionsWireTwo);
    $intersections = array_intersect($locationsWireOne, $locationsWireTwo);

    $closestIntersectionDistance = null;
    $shortestDistanceToIntersection = null;
    foreach ($intersections as $intersection) {
        $positions = explode(",", $intersection);
        $distance = abs($positions[0]) + abs($positions[1]);
        if (!$closestIntersectionDistance || $distance < $closestIntersectionDistance) {
            $closestIntersectionDistance = $distance;
        }

        $intersectionDistanceWireOne = array_search($intersection, $locationsWireOne) + 1;
        $intersectionDistanceWireTwo = array_search($intersection, $locationsWireTwo) + 1;
        $totalDistance = $intersectionDistanceWireOne + $intersectionDistanceWireTwo;
        if (!$shortestDistanceToIntersection || $totalDistance < $shortestDistanceToIntersection) {
            $shortestDistanceToIntersection = $totalDistance;
        }
    }

    return [$closestIntersectionDistance, $shortestDistanceToIntersection];
}

[$closestIntersectionDistance, $shortestDistanceToIntersection] = getIntersectionInfo();

print "Answer to Q3A: " . $closestIntersectionDistance . "\n";
print "Answer to Q3B: " . $shortestDistanceToIntersection . "\n";