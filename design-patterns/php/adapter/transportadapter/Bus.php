<?php
// Bus.php

namespace BigBoxCode\DesignPattern\Adapter\TransportAdapter;


class Bus implements Transport {
    public function getNumberOfWheels(): int {
        return 4;
    }

    public function getWeight(): float {
        return 10_000;
    }

    public function getDistanceTravelled(): float {
        return 1_000;
    }
    
    public function getTravelCostPerMile(): float {
        return 5;
    }
}