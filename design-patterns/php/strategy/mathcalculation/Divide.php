<?php
// Divide.php

namespace BigBoxCode\DesignPattern\Strategy\MathCalculation;


class Divide implements Calculation {
    public function execute(float $num1, float $num2): float {
        return $num1 / $num2;
    }
}