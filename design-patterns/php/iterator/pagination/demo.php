<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Iterator\Pagination\Page;
use BigBoxCode\DesignPattern\Iterator\Pagination\PageAggregator;

// Generate dummy list of pages for demo purpose.
// Not required for the the pattern implementation.
// This is used for testing the implementation.
function populatePageList(): \IteratorAggregate {
    $pageList = new PageAggregator();

    for ($i = 0; $i < 10; $i++) {
        $page = new Page();
        $page->setNumber($i);

        $pageList->add($page);
    }

    return $pageList;
}

// Demo start
$pageList = populatePageList();

foreach ($pageList->getIterator() as $page) {
    echo "Page Number: " . $page->getNumber() . "\n";
    echo "Page Path: " . $page->getPath() . "\n";
}