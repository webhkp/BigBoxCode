<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Bridge\TransportSeat\BusinessClassSeat;
use BigBoxCode\DesignPattern\Bridge\TransportSeat\EconomyClassSeat;
use BigBoxCode\DesignPattern\Bridge\TransportSeat\Plane;
use BigBoxCode\DesignPattern\Bridge\TransportSeat\Train;

$plane = new Plane(new BusinessClassSeat());
$plane->selectTransport();

$plane2 = new Plane(new EconomyClassSeat());
$plane2->selectTransport();

$train = new Train(new EconomyClassSeat());
$train->selectTransport();
