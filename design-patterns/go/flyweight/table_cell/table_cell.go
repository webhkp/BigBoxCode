// table_cell.go

package main

import "fmt"

type TableCell struct {
	width int
	text  string
}

func NewTableCell(width int) (tableCell *TableCell) {
	tableCell = &TableCell{}
	tableCell.width = width
	return
}

func (tableCell *TableCell) Draw() {
	fmt.Printf("Drawing cell : width = %v | text = %v\n", tableCell.width, tableCell.text)
}

func (tableCell *TableCell) SetText(text string) {
	tableCell.text = text
}
