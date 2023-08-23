<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\AbstractFactory\Transport\FactoryProducer;

$transportFactory1 = FactoryProducer::getFactory(2);
$transport1 = $transportFactory1?->getTransport("bicycle");

$transport1?->start();

$transportFactory2 = FactoryProducer::getFactory(4);
$transport2 = $transportFactory2?->getTransport("truck");

$transport2?->start();