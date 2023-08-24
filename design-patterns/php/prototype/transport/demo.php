<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Prototype\Transport\Plane;
use BigBoxCode\DesignPattern\Prototype\Transport\PlaneEngine;


// Prepare the engine object
$planeEngine = new PlaneEngine();
$planeEngine->setName("GE9X");
$planeEngine->setLength(220);
$planeEngine->setWeight(22_000);
$planeEngine->setNoOfBlade(16);
$planeEngine->setRpm(2_510);

// Create a plane object
$plane = new Plane();
$plane->setName("Boing 777");
$plane->setManufacturer("Boing");
$plane->setModel("777-200LR");
$plane->setLength(63.7);
$plane->setHeight(18.6);
$plane->setWingspan(64.8);
$plane->setSeat(317);
$plane->setEngine($planeEngine);

// Print details fo the plane
echo "Original Plane object:\n";
print_r($plane);

// Clone Plane object
$clonePlane = clone $plane;

// Print details just after cloning
echo "Clone Plane object:\n";
print_r($clonePlane);

// Change some value in clone plane
$clonePlane->setModel("777-300ER");
$clonePlane->getEngine()->setName("GE10YYYY");

echo "Clone Plane object after change:\n";
print_r($clonePlane);

// Check the original Plane object
echo "Original Plane object after changes in the clone:\n";
print_r($plane);
