<?php
// demo.php

require_once "VehicleBuilder.php";
require_once "VehicleProducer.php";
require_once "CarBuilder.php";
require_once "PlaneBuilder.php";
require_once "Car.php";
require_once "Plane.php";

use Builder\Vehicle\CarBuilder;
use Builder\Vehicle\PlaneBuilder;
use Builder\Vehicle\VehicleProducer;

$vehicleProducer = new VehicleProducer();

echo "Building Car:\n\n";

$carBuilder = new CarBuilder();
$vehicleProducer->buildCar($carBuilder);

$car = $carBuilder->build();
echo "\nFinal result:\n" . $car;


echo "\n\nBuilding Plane:\n\n";

$planeBuilder = new PlaneBuilder();
$vehicleProducer->buildPlane($planeBuilder);

$plane = $planeBuilder->build();
echo "\nFinal result:\n" . $plane;
