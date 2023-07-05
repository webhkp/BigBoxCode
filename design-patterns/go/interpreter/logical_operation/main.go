// main.go

package main

import "fmt"

func main() {
	op1 := NewTerminalOperation("Big")
	op2 := NewTerminalOperation("Box")

	andChecker := NewAndOperation(op1, op2)
	orChecker := NewOrOperation(op1, op2)
	xorChecker := NewXorOperation(op1, op2)

	checkStr1 := "Big Box Code"
	checkStr2 := "Only Big Code"
	checkStr3 := "Only Box Code"
	checkStr4 := "No Code"

	andResult1 := andChecker.Execute(checkStr1)
	andResult2 := andChecker.Execute(checkStr2)
	andResult3 := andChecker.Execute(checkStr3)
	andResult4 := andChecker.Execute(checkStr4)

	fmt.Printf("Data: %v; AND Result: %v\n", checkStr1, andResult1)
	fmt.Printf("Data: %v; AND Result: %v\n", checkStr2, andResult2)
	fmt.Printf("Data: %v; AND Result: %v\n", checkStr3, andResult3)
	fmt.Printf("Data: %v; AND Result: %v\n", checkStr4, andResult4)

	orResult1 := orChecker.Execute(checkStr1)
	orResult2 := orChecker.Execute(checkStr2)
	orResult3 := orChecker.Execute(checkStr3)
	orResult4 := orChecker.Execute(checkStr4)

	fmt.Printf("Data: %v; OR Result: %v\n", checkStr1, orResult1)
	fmt.Printf("Data: %v; OR Result: %v\n", checkStr2, orResult2)
	fmt.Printf("Data: %v; OR Result: %v\n", checkStr3, orResult3)
	fmt.Printf("Data: %v; OR Result: %v\n", checkStr4, orResult4)

	xorResult1 := xorChecker.Execute(checkStr1)
	xorResult2 := xorChecker.Execute(checkStr2)
	xorResult3 := xorChecker.Execute(checkStr3)
	xorResult4 := xorChecker.Execute(checkStr4)

	fmt.Printf("Data: %v; XOR Result: %v\n", checkStr1, xorResult1)
	fmt.Printf("Data: %v; XOR Result: %v\n", checkStr2, xorResult2)
	fmt.Printf("Data: %v; XOR Result: %v\n", checkStr3, xorResult3)
	fmt.Printf("Data: %v; XOR Result: %v\n", checkStr4, xorResult4)
}
