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
$pageIterator = $pageList->getIterator();

echo "Page list:\n\n";

foreach ($pageIterator as $page) {
    echo "Page Number: " . $page->getNumber() . "\n";
    echo "Page Path: " . $page->getPath() . "\n";
}


// Rewind and print pag data again
$pageIterator->rewind();

echo "\n\nPage list after rewinding:\n\n";

while ($pageIterator->valid()) {
    echo "Pagination key: " . $pageIterator->key() . "\n";
    echo "Page Number: " . $pageIterator->current()->getNumber() . "\n";
    echo "Page Path: " . $pageIterator->current()->getPath() . "\n";

    $pageIterator->next();
}