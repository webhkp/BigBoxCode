// table_cell_factory.go

package main

type TableCellFactory struct {
	tableCells map[int]TableCell
}

func NewTableCellFactory() (tableCellFactory *TableCellFactory) {
	tableCellFactory = &TableCellFactory{}
	tableCellFactory.tableCells = make(map[int]TableCell)
	return
}

func(tableCellFactory *TableCellFactory) GetTableCell(column int, width int) (tableCell TableCell) {
	tableCell, ok := tableCellFactory.tableCells[column]

	if ok {
		return tableCell
	}

	tableCell = *NewTableCell(width)
	tableCellFactory.tableCells[column] = tableCell

	return tableCell;
}

// For demo purpose only, not required in actual implementation
func (tableCellFactory *TableCellFactory) GetCellObjectCount() int {
	return len(tableCellFactory.tableCells)
}

// public class TableCellFactory {
//     private static Map<Integer, TableCell> tableCells = new HashMap<>();

    
// }