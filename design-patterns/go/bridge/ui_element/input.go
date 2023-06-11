// input.go

package main

import "fmt"

type Input struct {
	colorSchema ColorSchema
}

func NewInput(colorSchema ColorSchema) (input *Input) {
	input = &Input{}
	input.colorSchema = colorSchema
	return
}

func (input *Input) PrintElement() {
	input.colorSchema.SetColor()

	fmt.Println("Printing Input")
}