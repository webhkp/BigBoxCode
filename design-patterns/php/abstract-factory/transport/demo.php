<?php
// demo.php

require_once "Transport.php";
require_once "AbstractTransportFactroy.php";
require_once "FourWheelTransporFactry.php";
require_once "TwoWheelTransportFactry.php";
require_once "FactryProducer.php";
require_once "Car.php";
require_once "Bicycle.php";
require_once "Motorcycle.php";
require_once "Truck.php";

use AbstractFactory\Transport\FactoryProducer;


$transportFactory1 = FactoryProducer::getFactory(2);
$transport1 = $transportFactory1?->getTransport("bicycle");

$transport1?->start();

$transportFactory2 = FactoryProducer::getFactory(4);
$transport2 = $transportFactory2?->getTransport("truck");

$transport2?->start();