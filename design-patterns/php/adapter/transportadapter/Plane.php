<?php
// Plane.php

namespace BigBoxCode\DesignPattern\Adapter\TransportAdapter;


class Plane implements AirTransport {
    public function getNumberOfWheels(): int {
        return 3;
    }

    public function getNumberOfEngines(): int {
        return 2;
    }

    public function getWeight(): float {
        return 127_000;
    }

    public function getDistanceTravelled(): float {
        return 500;
    }

    public function getTravelCostTotal(): float {
        return 3_000;
    }
}