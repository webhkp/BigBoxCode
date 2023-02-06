package com.bigboxcode.designpattern.strategy.calculator;

public class Multiply implements Calculation {
    @Override
    public float execute(float num1, float num2) {
        return num1 * num2;
    }
}
