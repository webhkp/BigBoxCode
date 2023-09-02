<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Composite\TransportList\Bike;
use BigBoxCode\DesignPattern\Composite\TransportList\Car;
use BigBoxCode\DesignPattern\Composite\TransportList\Plane;
use BigBoxCode\DesignPattern\Composite\TransportList\TransportGroup;

$bike = new Bike();
$plane = new Plane();
$car = new Car();
$secondCar = new Car();

$transports = new TransportGroup();
$transports->addTransport($bike);
$transports->addTransport($plane);
$transports->addTransport($car);
$transports->addTransport($secondCar);

echo "-----------------Output with 4 transports------------------\n";

$transports->start();
$transports->operate();
$transports->stop();

echo "\n-----------------Output when plane is removed------------------\n";

$transports->removeTransport($plane);

$transports->start();
$transports->operate();
$transports->stop();