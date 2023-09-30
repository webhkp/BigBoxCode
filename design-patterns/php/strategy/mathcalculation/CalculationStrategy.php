<?php
// CalculationStrategy.php

namespace BigBoxCode\DesignPattern\Strategy\MathCalculation;


class CalculationStrategy {
    public function __construct(private Calculation $calculation) {
    }

    public function execute(float $num1, float $num2): float {
        return $this->calculation->execute($num1, $num2);
    }
}