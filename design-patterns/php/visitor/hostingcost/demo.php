<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Visitor\HostingCost\ComputeService;
use BigBoxCode\DesignPattern\Visitor\HostingCost\ContainerService;
use BigBoxCode\DesignPattern\Visitor\HostingCost\DatabaseService;
use BigBoxCode\DesignPattern\Visitor\HostingCost\FileStorageService;
use BigBoxCode\DesignPattern\Visitor\HostingCost\HostingCalculatorVisitorImpl;
use BigBoxCode\DesignPattern\Visitor\HostingCost\ServerlessService;

// Utility function calculating the hosting cost
// This is not required for the Visitor pattern implementation
// This uses the visitor pattern implementation
function calculateHostingCost(array $services): float {
    $hostingCalculatorVisitorImpl = new HostingCalculatorVisitorImpl();

    $totalCost = 0;

    foreach ($services as $service) {
        $totalCost += $service->accept($hostingCalculatorVisitorImpl);
    }

    return $totalCost;
}


// Demo
$usedServices = [
    new ComputeService(3),
    new DatabaseService(3, true),
    new FileStorageService(120),
    new ServerlessService(720),
    new ContainerService(2),
];

$totalCost = calculateHostingCost($usedServices);

echo "Total cost of hosting is: " . $totalCost . "\n";
