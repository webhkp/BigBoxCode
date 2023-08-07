// add.go

package main

type Add struct {}

func NewAdd() (add *Add) {
	add = &Add{}
	return
}

func (add *Add) Execute(num1 float32, num2 float32) (float32) {
	return num1 + num2
}