// input_box.go

package main

import "fmt"

type InputBox struct {
}

func NewInputBox() (inputBox *InputBox) {
	inputBox = &InputBox{}
	return
}

func (inputBox *InputBox) Draw() {
	fmt.Println("Drawing Input Box")
}