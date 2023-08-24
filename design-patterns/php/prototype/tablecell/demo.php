<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Prototype\TableCell\Cell;


// Create Cell object
$cell = new Cell(1, 1);
$cell->setContent("Original cell content");
$cell->setBackground("808080");

echo "Cell object:\n";
print_r($cell);

// Clone Cell object
$cellClone = clone $cell;

echo "Cell Clone:\n";
print_r($cellClone);

// Change values in clone
$cellClone->setContent("Clone cell");
$cellClone->setBackground("008000");
$cellClone->setTextColor("FFFFFF");


echo "Clone object after changing:\n";
print_r($cellClone);

// Check the original cell object
echo "Original cell object:\n";
print_r($cell);