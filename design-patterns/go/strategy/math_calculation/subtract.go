// subtract.go

package main

type Subtract struct {}

func NewSubtract() (subtract *Subtract) {
	subtract = &Subtract{}
	return
}

func (subtract *Subtract) Execute(num1 float32, num2 float32) (float32) {
	return num1 - num2
}