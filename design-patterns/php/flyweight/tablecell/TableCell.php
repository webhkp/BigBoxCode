<?php
// TableCell.php

namespace BigBoxCode\DesignPattern\Flyweight\TableCell;


class TableCell {
    private int $width;
    private string $text = '';

    public function __construct(int $width) {
        $this->width = $width;
    }

    public function setText(string $text) {
        $this->text = $text;
    }

    public function draw(): void {
        echo "Drawing cell : width = " . $this->width . " | text = " . $this->text . "\n";
    }
}