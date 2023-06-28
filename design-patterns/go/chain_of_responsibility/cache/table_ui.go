// table_ui.go

package main

import "fmt"

type TableUi struct {
}

func NewTableUi() (tableUi *TableUi) {
	tableUi = &TableUi{}
	return
}

func (tableUi *TableUi) Print() {
	fmt.Println("Printing Table")
}

func (tableUi *TableUi) Remove() {
	fmt.Println("Removing Table")
}