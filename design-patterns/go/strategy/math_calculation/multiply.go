// multiply.go

package main

type Multiply struct {}

func NewMultiply() (rcvr *Multiply) {
	rcvr = &Multiply{}
	return
}

func (rcvr *Multiply) Execute(num1 float32, num2 float32) (float32) {
	return num1 * num2
}