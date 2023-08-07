// divide.go

package main


type Divide struct {}

func NewDivide() (divide *Divide) {
	divide = &Divide{}
	return
}

func (divide *Divide) Execute(num1 float32, num2 float32) (float32) {
	return num1 / num2
}