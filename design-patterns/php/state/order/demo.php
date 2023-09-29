<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\State\Order\OrderContext;


$order = new OrderContext();

$order->runNextProcess();
$order->runNextProcess();
$order->runNextProcess();
$order->runNextProcess();

// Trying to process after all steps are complete
$order->runNextProcess();