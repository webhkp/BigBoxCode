<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Composite\Menu\MenuItem;
use BigBoxCode\DesignPattern\Composite\Menu\MenuParent;

// Define some menu items
$item1 = new MenuItem("http://firstlink.com", "First Item");
$item2 = new MenuItem("http://secondlink.com", "Second Item");
$item3 = new MenuItem("http://thirdlink.com", "Third Item");

// Define a group of items
$itemGroup1 = new MenuParent();
$itemGroup1->addItem(new MenuItem("http://group-item-1.com", "First group item"));
$itemGroup1->addItem(new MenuItem("http://group-item-2.com", "Second group item"));
$itemGroup1->addItem(new MenuItem("http://group-item-3.com", "Third group item"));
$itemGroup1->addItem(new MenuItem("http://group-item-4.com", "Fourth group item"));


$item4 = new MenuItem("http://item-4.com", "4th Item");

// Add items to menu
$mainMenu = new MenuParent();
$mainMenu->addItem($item1);
$mainMenu->addItem($item2);
$mainMenu->addItem($item3);
$mainMenu->addItem($itemGroup1);
$mainMenu->addItem($item4);

// Print menu
$mainMenu->print();