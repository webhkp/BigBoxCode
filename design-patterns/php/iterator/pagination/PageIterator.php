<?php
// PageIterator.php

namespace BigBoxCode\DesignPattern\Iterator\Pagination;


class PageIterator implements \Iterator {
    private int $currentPosition = 0;

    public function __construct(private array $pages) {
    }

    // Get current page
    function current(): mixed {
        return $this->pages[$this->currentPosition];
    }

    // Get current index
    function key(): int {
        return $this->currentPosition;
    }

    // Move to the next index
    function next(): void {
        $this->currentPosition++;
    }

    // Reset index to the first page
    function rewind(): void {
        $this->currentPosition = 0;
    }

    // Check if the current index exists or not
    function valid(): bool {
        return isset($this->pages[$this->currentPosition]);
    }
}