<?php
// Calculation.php

namespace BigBoxCode\DesignPattern\Strategy\MathCalculation;


interface Calculation {
    function execute(float $num1, float $num2): float;
}