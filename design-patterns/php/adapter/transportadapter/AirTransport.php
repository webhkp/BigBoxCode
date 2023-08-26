<?php
// AirTransport.php

namespace BigBoxCode\DesignPattern\Adapter\TransportAdapter;

interface AirTransport {
    public function getNumberOfWheels(): int;
    public function getNumberOfEngines(): int;
    public function getWeight(): float;
    public function getDistanceTravelled(): float;
    public function getTravelCostTotal(): float;
}