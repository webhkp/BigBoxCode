<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Adapter\TransportAdapter\AirTransportAdapter;
use BigBoxCode\DesignPattern\Adapter\TransportAdapter\Bus;
use BigBoxCode\DesignPattern\Adapter\TransportAdapter\Plane;

echo "Get information of Bus travel...";

$bus = new Bus();
echo "\nNumber of wheels: " . $bus->getNumberOfWheels();
echo "\nWeight(kg): " . $bus->getWeight();
echo "\nDistance(miles): " . $bus->getDistanceTravelled();
echo "\nCost per mile: " . $bus->getTravelCostPerMile();


echo "\n\nGet information of Plane travel...";

$planeTransport = new AirTransportAdapter(new Plane());
echo "\nNumber of wheels: " . $planeTransport->getNumberOfWheels();
echo "\nWeight(kg): " . $planeTransport->getWeight();
echo "\nDistance(miles): " . $planeTransport->getDistanceTravelled();
echo "\nCost per mile: " . $planeTransport->getTravelCostPerMile();