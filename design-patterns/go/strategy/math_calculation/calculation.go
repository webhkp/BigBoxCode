// calculation.go

package main

type Calculation interface {
	Execute(num1 float32, num2 float32) (float32)
}