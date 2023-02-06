package com.bigboxcode.designpattern.strategy.calculator;

public class CalculationStrategy {
    private final Calculation calculation;

    public CalculationStrategy(Calculation calculation) {
        this.calculation = calculation;
    }

    public float execute(float num1, float num2) {
        return this.calculation.execute(num1, num2);
    }
}
