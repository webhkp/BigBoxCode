// table-cell-factory.ts

import TableCell from "./table-cell";

class TableCellFactory {
    static tableCells = new Map<number, TableCell>();

    static getTableCell(column: number, width: number): TableCell {
        let tableCell = this.tableCells.get(column);

        if (null != tableCell) return tableCell;

        tableCell = new TableCell(width);
        this.tableCells.set(column, tableCell);

        return tableCell;
    }

    // For demo purpose only, not required in actual implementation
    static getCellObjectCount(): number {
        return this.tableCells.size;
    }
}

export default TableCellFactory;