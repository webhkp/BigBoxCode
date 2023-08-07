// calculation_strategy.go

package main

type CalculationStrategy struct {
	calculation Calculation
}

func NewCalculationStrategy(calculation Calculation) (calculationStrategy *CalculationStrategy) {
	calculationStrategy = &CalculationStrategy{}
	calculationStrategy.calculation = calculation
	return
}

func (calculationStrategy *CalculationStrategy) Execute(num1 float32, num2 float32) (float32) {
	return calculationStrategy.calculation.Execute(num1, num2)
}