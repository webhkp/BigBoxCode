<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Strategy\Transport\Bike;
use BigBoxCode\DesignPattern\Strategy\Transport\Car;
use BigBoxCode\DesignPattern\Strategy\Transport\Plane;
use BigBoxCode\DesignPattern\Strategy\Transport\TransportStrategy;

// Use bike
echo "Operating Bike:\n";

$myTransport = new TransportStrategy(new Bike());
$myTransport->execute();
$myTransport->stop();

// Use car
echo "Operating Car:\n";

$myTransport->setStrategy(new Car());
$myTransport->execute();
$myTransport->stop();
$myTransport->repair();

// Use plane
echo "Operating plane:\n";

$myTransport = new TransportStrategy(new Plane());
$myTransport->execute();
$myTransport->stop();