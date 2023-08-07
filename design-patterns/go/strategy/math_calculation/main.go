// main.go

package main

import "fmt"

func main() {
	fmt.Println("Performing operation: ADD")

	myCalculation := NewCalculationStrategy(NewAdd())
	result := myCalculation.Execute(10, 5)

	fmt.Printf("10 + 5 = %v\n", result)

	fmt.Println("\n\nPerforming operation: SUBTRACT")

	myCalculation = NewCalculationStrategy(NewSubtract())
	result = myCalculation.Execute(10, 5)

	fmt.Printf("10 - 5 = %v\n", result)

	fmt.Println("\n\nPerforming operation: MULTIPLY")

	myCalculation = NewCalculationStrategy(NewMultiply())
	result = myCalculation.Execute(10, 5)

	fmt.Printf("10 * 5 = %v\n", result)

	fmt.Println("\n\nPerforming operation: DIVIDE")

	myCalculation = NewCalculationStrategy(NewDivide())
	result = myCalculation.Execute(10, 5)

	fmt.Printf("10 / 5 = %v\n", result)
}
