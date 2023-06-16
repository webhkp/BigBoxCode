// table.go

package main

import "fmt"

type Table struct {
}

func NewTable() (table *Table) {
	table = &Table{}
	return
}

func (table *Table) Draw() {
	fmt.Println("Drawing Table")
}