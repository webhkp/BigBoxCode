<?php
// demo.php

require_once "Transport.php";
require_once "TransportFactory.php";
require_once "Bike.php";
require_once "Car.php";
require_once "Plane.php";

use Factory\Transport\TransportFactory;


$transportFactory = new TransportFactory();

$transport1 = $transportFactory->getTransport("bike");
$transport1->start();

$transport2 = $transportFactory->getTransport("car");
$transport2->start();

$transport3 = $transportFactory->getTransport("plane");
$transport3->start();