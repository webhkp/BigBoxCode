// button_ui.go

package main

import "fmt"

type ButtonUi struct {
	name string
}

func NewButtonUi(name string) (rcvr *ButtonUi) {
	rcvr = &ButtonUi{}
	rcvr.name = name
	return
}

func (rcvr *ButtonUi) Print() {
	fmt.Println(fmt.Sprintf("%v%v%v", "Printing ", rcvr.name, " Button"))
}

func (rcvr *ButtonUi) Remove() {
	fmt.Println(fmt.Sprintf("%v%v%v", "Removing ", rcvr.name, "  Button"))
}