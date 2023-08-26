<?php
// Helicopter.php

namespace BigBoxCode\DesignPattern\Adapter\TransportAdapter;

class Helicopter implements AirTransport {
    public function getNumberOfWheels(): int {
        return 0;
    }

    public function getNumberOfEngines(): int {
        return 1;
    }

    public function getWeight(): int {
        return 12000;
    }

    public function getDistanceTravelled(): int {
        return 180;
    }

    public function getTravelCostTotal(): int {
        return 20000;
    }
}