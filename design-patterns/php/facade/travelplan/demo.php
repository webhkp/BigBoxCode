<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Facade\TravelPlan\TravelFacade;

$travelFacade = new TravelFacade(10, 10, 20, 30);

$currentLocation = $travelFacade->getCurrentLocation();

echo "Current Latitude: " . $currentLocation->getLat() . "\n";
echo "Current Longitude: " . $currentLocation->getLng() . "\n";


$travelFacade->getLocationInfo(20, 30);

$travelFacade->getTotalTollAmount(20, 30);

$travelFacade->operateCar();