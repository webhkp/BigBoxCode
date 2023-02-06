package com.bigboxcode.designpattern.flyweight.table;

public class Demo {
    public static void main(String[] args) {
        // There are 5 columns with width 3, 6, 2, 5, 10 of some standard unit
        int[] columnWidths = {3, 6, 2, 5, 10};

        // Print 1000 rows
        for (int row = 0; row < 1000; row++) {
            for (int column = 0; column < columnWidths.length; column++) {
                TableCell tableCell = TableCellFactory.getTableCell(column, columnWidths[column]);
                tableCell.setText(row + "-" + column); // For demo purpose, text can come from any other sources

                tableCell.draw();
            }
        }

        System.out.println("Total number of tree objects: " + TableCellFactory.getCellObjectCount());

    }
}
