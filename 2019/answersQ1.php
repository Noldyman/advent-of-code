<?php
$input = file_get_contents('./inputs/inputQ1.txt', 'r');
$masses = explode("\n", $input);

$totalFuelA = 0;
$totalFuelB = 0;

function calcFuel(int $mass){
    return floor($mass / 3 - 2);
}

function calcTotalFuelA(){
    global $totalFuelA, $masses;

    foreach($masses as $mass){
        $totalFuelA += calcFuel($mass);
    }
}

function calcTotalFuelB(){
    global $totalFuelB, $masses;
    
    foreach($masses as $mass){
        $lastCalculatedFuel = calcFuel($mass);
        while ($lastCalculatedFuel>0){
            $totalFuelB += $lastCalculatedFuel;
            $lastCalculatedFuel = calcFuel($lastCalculatedFuel);
        }
    }
}

calcTotalFuelA();
calcTotalFuelB();
print "Answer Q1A is: " . $totalFuelA . "\n";
print "Answer Q1B is: " . $totalFuelB;