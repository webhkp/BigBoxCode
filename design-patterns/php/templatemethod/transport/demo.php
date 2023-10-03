<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\TemplateMethod\Transport\Car;
use BigBoxCode\DesignPattern\TemplateMethod\Transport\Plane;

// Build Car
$car = new Car();
$car->build();

// Build Plane
$plane = new Plane();
$plane->build();