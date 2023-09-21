<?php
// PageAggregator.php

namespace BigBoxCode\DesignPattern\Iterator\Pagination;


class PageAggregator implements \IteratorAggregate {
    private array $pages = [];

    public function add(Page $page): void {
        $this->pages[$page->getNumber()] = $page;
    }

    public function remove(Page $page): void {
        unset($this->pages[$page->getNumber()]);
    }

    public function getIterator(): \Iterator {
        return new PageIterator($this->pages);
    }
}