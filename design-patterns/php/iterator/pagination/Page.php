<?php
// Page.php

namespace BigBoxCode\DesignPattern\Iterator\Pagination;

class Page {
    private int $pageNumber = 0;
    private ?string $path = null;

    public function getNumber(): int {
        return $this->pageNumber;
    }

    public function setNumber(int $pageNumber): void {
        $this->pageNumber = $pageNumber;
    }

    public function getPath(): string {
        if ($this->path == null) {
            return "/page/" . $this->pageNumber;
        }

        return $this->path;
    }

    public function setPath(string $path): void {
        $this->path = $path;
    }
}