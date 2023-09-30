<?php
// Subtract.php

namespace BigBoxCode\DesignPattern\Strategy\MathCalculation;


class Subtract implements Calculation {
    public function execute(float $num1, float $num2): float {
        return $num1 - $num2;
    }
}