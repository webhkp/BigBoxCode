<?php
// Bike.php

namespace BigBoxCode\DesignPattern\Adapter\TransportAdapter;


class Bike implements Transport {
    public function getNumberOfWheels(): int {
        return 2;
    }

    public function getWeight(): float {
        return 700;
    }

    public function getDistanceTravelled(): float {
        return 80;
    }

    public function getTravelCostPerMile(): float {
        return 4;
    }
}