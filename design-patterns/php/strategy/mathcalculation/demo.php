<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Strategy\MathCalculation\Add;
use BigBoxCode\DesignPattern\Strategy\MathCalculation\CalculationStrategy;
use BigBoxCode\DesignPattern\Strategy\MathCalculation\Divide;
use BigBoxCode\DesignPattern\Strategy\MathCalculation\Multiply;
use BigBoxCode\DesignPattern\Strategy\MathCalculation\Subtract;


echo "Performing operation: ADD\n";

$myCalculation = new CalculationStrategy(new Add());
$result = $myCalculation->execute(10, 5);

echo "10 + 5 = " . $result . "\n";


echo "Performing operation: SUBTRACT\n";

$myCalculation = new CalculationStrategy(new Subtract());
$result = $myCalculation->execute(10, 5);

echo "10 - 5 = " . $result . "\n";


echo "Performing operation: MULTIPLY\n";

$myCalculation = new CalculationStrategy(new Multiply());
$result = $myCalculation->execute(10, 5);

echo "10 * 5 = " . $result . "\n";


echo "Performing operation: DIVIDE\n";

$myCalculation = new CalculationStrategy(new Divide());
$result = $myCalculation->execute(10, 5);

echo "10 / 5 = " . $result . "\n";