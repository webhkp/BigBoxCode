// calculation-strategy.ts

import Calculation from "./calculation";

class CalculationStrategy {
    private calculation: Calculation;

    constructor(calculation: Calculation) {
        this.calculation = calculation;
    }

    execute(num1: number, num2: number): number {
        return this.calculation.execute(num1, num2);
    }
}

export default CalculationStrategy;