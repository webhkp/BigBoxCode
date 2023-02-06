// TableCellFactory.java
package com.bigboxcode.designpattern.flyweight.table;

import java.util.HashMap;
import java.util.Map;

public class TableCellFactory {
    private static Map<Integer, TableCell> tableCells = new HashMap<>();

    public static TableCell getTableCell(int column, int width) {
        TableCell tableCell = tableCells.get(column);

        if (null != tableCell) return tableCell;

        tableCell = new TableCell(width);
        tableCells.put(column, tableCell);

        return tableCell;
    }

    // For demo purpose only, not required in actual implementation
    public static int getCellObjectCount() {
        return tableCells.size();
    }
}
