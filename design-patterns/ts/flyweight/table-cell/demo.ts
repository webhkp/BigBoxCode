// demo.ts

import TableCellFactory from "./table-cell-factory";

// For demo there are 5 columns with width 3, 6, 2, 5, 10 of some standard unit
const columnWidths: number[] = [3, 6, 2, 5, 10];

// Print 1000 rows
for (let row = 0; row < 1000; row++) {
    for (let column = 0; column < columnWidths.length; column++) {
        const tableCell = TableCellFactory.getTableCell(column, columnWidths[column]);
        tableCell.setText(row + "-" + column); // For demo purpose, text can come from any other sources

        tableCell.draw();
    }
}

console.log("Total number of tree objects: " + TableCellFactory.getCellObjectCount());

