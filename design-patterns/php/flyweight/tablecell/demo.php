<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Flyweight\TableCell\TableCellFactory;


// For demo there are 5 columns with width 3, 6, 2, 5, 10 of some standard unit
$columnWidths = [3, 6, 2, 5, 10];

// Print 1000 rows
for ($row = 0; $row < 1000; $row++) {
    for ($column = 0; $column < count($columnWidths); $column++) {
        $tableCell = TableCellFactory::getTableCell($column, $columnWidths[$column]);
        $tableCell->setText($row . "-" . $column); // For demo purpose, text can come from any other sources

        $tableCell->draw();
    }
}

echo "Total number of tree objects: " . count(TableCellFactory::$tableCells);