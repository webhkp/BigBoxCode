// table.go

package main

import "fmt"

type Table struct {
	colorSchema ColorSchema
}

func NewTable(colorSchema ColorSchema) (table *Table) {
	table = &Table{}
	table.colorSchema = colorSchema
	return
}
func (table *Table) PrintElement() {
	table.colorSchema.SetColor()

	fmt.Println("Printing Table")
}
