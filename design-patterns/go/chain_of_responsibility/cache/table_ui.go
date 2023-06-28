// table_ui.go

package main

import "fmt"

type TableUi struct {
}

func NewTableUi() (rcvr *TableUi) {
	rcvr = &TableUi{}
	return
}

func (rcvr *TableUi) Print() {
	fmt.Println("Printing Table")
}

func (rcvr *TableUi) Remove() {
	fmt.Println("Removing Table")
}