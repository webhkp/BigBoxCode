<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Factory\Transport\TransportFactory;


$transportFactory = new TransportFactory();

$transport1 = $transportFactory->getTransport("bike");
$transport1?->start();

$transport2 = $transportFactory->getTransport("car");
$transport2?->start();

$transport3 = $transportFactory->getTransport("plane");
$transport3->start();