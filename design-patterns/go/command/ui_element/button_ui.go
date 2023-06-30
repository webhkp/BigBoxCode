// button_ui.go

package main

import "fmt"

type ButtonUi struct {
	name string
}

func NewButtonUi(name string) (buttonUi *ButtonUi) {
	buttonUi = &ButtonUi{}
	buttonUi.name = name
	return
}

func (buttonUi *ButtonUi) Print() {
	fmt.Printf("Printing %s Buton\n", buttonUi.name)
}

func (buttonUi *ButtonUi) Remove() {
	fmt.Printf("Removing %s Button\n", buttonUi.name)
}