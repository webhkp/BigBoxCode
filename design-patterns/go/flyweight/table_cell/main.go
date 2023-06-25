// main.go

package main

import "fmt"

func main() {
	columnWidths := []int{3, 6, 2, 5, 10}
	tableCellFactory := NewTableCellFactory()

	for row := 0; row < 100; row++ {
		for column := 0; column < len(columnWidths); column++ {
			tableCell := tableCellFactory.GetTableCell(column, columnWidths[column])
			tableCell.SetText(fmt.Sprintf("%d-%d", row, column))
			tableCell.Draw()
		}
	}

	fmt.Printf("Total number of objects: %v", tableCellFactory.GetCellObjectCount())
}
