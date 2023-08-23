<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Factory\TransportMethod\AirTransportFactory;
use BigBoxCode\DesignPattern\Factory\TransportMethod\RoadTransportFactory;

$roadTransportFactory = new RoadTransportFactory();
$airTransportFactory = new AirTransportFactory();

$roadTransportFactory->operateTransport("bus");

$airTransportFactory->operateTransport("helicopter");

$roadTransportFactory->repairTransport("bike");