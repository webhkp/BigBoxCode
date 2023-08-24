<?php
// Cell.php

namespace BigBoxCode\DesignPattern\Prototype\TableCell;

class Cell {
    private int $row;
    private int $column;
    private int $height = 10;
    private int $weight = 100;
    private ?string $content;
    private string $background = "FFFFFF";
    private string $textColor = "000000";

    public function __construct(int $row, int $column) {
        $this->row = $row;
        $this->column = $column;
    }

    public function getRow(): int {
        return $this->row;
    }

    public function setRow(int $row) {
        $this->row = $row;
    }

    public function getColumn(): int {
        return $this->column;
    }

    public function setColumn(int $column) {
        $this->column = $column;
    }

    public function getHeight(): int {
        return $this->height;
    }

    public function setHeight(int $height) {
        $this->height = $height;
    }

    public function getWeight(): int {
        return $this->weight;
    }

    public function setWeight(int $weight) {
        $this->weight = $weight;
    }

	public function getContent(): string {
		return $this->content;
	}
	
	public function setContent(string $content) {
		$this->content = $content;
	}

    public function getBackground(): string {
        return $this->background;
    }

    public function setBackground(string $background) {
        $this->background = $background;
    }

    public function getTextColor(): string {
        return $this->textColor;
    }

    public function setTextColor(string $textColor) {
        $this->textColor = $textColor;
    }

    public function __clone() {
        $this->row = 0;
        $this->column = 0;
        $this->height = 10;
        $this->weight = 100;
        $this->content = null;
        $this->background = "FFFFFF";
        $this->textColor = "000000";
    }
}