<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Builder\Vehicle\CarBuilder;
use BigBoxCode\DesignPattern\Builder\Vehicle\PlaneBuilder;
use BigBoxCode\DesignPattern\Builder\Vehicle\VehicleProducer;

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
