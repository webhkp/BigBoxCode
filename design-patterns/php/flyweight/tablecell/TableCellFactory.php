<?php
// TableCellFactory.php

namespace BigBoxCode\DesignPattern\Flyweight\TableCell;

class TableCellFactory {
    public static array $tableCells = [];

    public static function getTableCell(int $column, int $width): TableCell {
        if (isset(self::$tableCells[$column])) {
            return self::$tableCells[$column];
        }

        $tableCell = new TableCell($width);
        self::$tableCells[$column] = $tableCell;

        return $tableCell;
    }
}