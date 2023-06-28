// input_ui.go

package main

import "fmt"

type InputUi struct {
}

func NewInputUi() (rcvr *InputUi) {
	rcvr = &InputUi{}
	return
}
func (rcvr *InputUi) Print() {
	fmt.Println("Printing Input")
}
func (rcvr *InputUi) Remove() {
	fmt.Println("Removing Input")
}
