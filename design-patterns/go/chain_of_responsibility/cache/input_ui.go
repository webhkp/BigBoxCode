// input_ui.go

package main

import "fmt"

type InputUi struct {
}

func NewInputUi() (inputUi *InputUi) {
	inputUi = &InputUi{}
	return
}

func (inputUi *InputUi) Print() {
	fmt.Println("Printing Input")
}

func (inputUi *InputUi) Remove() {
	fmt.Println("Removing Input")
}
