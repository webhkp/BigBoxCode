// button.go

package main

import "fmt"

type Button struct {
	colorSchema ColorSchema
}

func NewButton(colorSchema ColorSchema) (button *Button) {
	button = &Button{}
	button.colorSchema = colorSchema
	return
}
func (button *Button) PrintElement() {
	button.colorSchema.SetColor()

	fmt.Println("Printing Button")
}
