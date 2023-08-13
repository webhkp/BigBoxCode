<?php
// demo.php

require_once "Transport.php";
require_once "TransportFactory.php";
require_once "RoadTransportFactory.php";
require_once "AirTransportFactory.php";
require_once "Bike.php";
require_once "Bus.php";
require_once "Car.php";
require_once "Helicopter.php";
require_once "Plane.php";

use Factory\TransportMethod\AirTransportFactory;
use Factory\TransportMethod\RoadTransportFactory;

$roadTransportFactory = new RoadTransportFactory();
$airTransportFactory = new AirTransportFactory();

$roadTransportFactory->operateTransport("bus");

$airTransportFactory->operateTransport("helicopter");

$roadTransportFactory->repairTransport("bike");