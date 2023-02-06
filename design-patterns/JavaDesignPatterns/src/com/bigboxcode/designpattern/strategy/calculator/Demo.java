package com.bigboxcode.designpattern.strategy.calculator;

public class Demo {
    public static void main(String[] args) {
        // Perform Addition
        System.out.println("Performing operation: ADD");

        CalculationStrategy myCalculation = new CalculationStrategy(new Add());
        float result = myCalculation.execute(10, 5);
        System.out.println("10 + 5 = " + result);

        // Perform Subtraction
        System.out.println("\n\nPerforming operation: SUBTRACT");

        myCalculation = new CalculationStrategy(new Subtract());
        result = myCalculation.execute(10, 5);
        System.out.println("10 - 5 = " + result);

        // Perform Multiplication
        System.out.println("\n\nPerforming operation: MULTIPLY");

        myCalculation = new CalculationStrategy(new Multiply());
        result = myCalculation.execute(10, 5);
        System.out.println("10 * 5 = " + result);

        // Perform Division
        System.out.println("\n\nPerforming operation: DIVIDE");

        myCalculation = new CalculationStrategy(new Divide());
        result = myCalculation.execute(10, 5);

        System.out.println("10 / 5 = " + result);
    }
}
