<?php
// AirTransportAdapter.php

namespace BigBoxCode\DesignPattern\Adapter\TransportAdapter;


class AirTransportAdapter implements Transport {
    public function __construct(private AirTransport $airTransport) {
        $this->airTransport = $airTransport;
    }

    public function getNumberOfWheels(): int {
        return $this->airTransport->getNumberOfWheels();
    }

    public function getWeight(): float {
        return $this->airTransport->getWeight();
    }

    public function getDistanceTravelled(): float {
        $distanceInNauticalMile = $this->airTransport->getDistanceTravelled();
        return $distanceInNauticalMile * 1.151;
    }

    public function getTravelCostPerMile(): float {
        $totalCost = $this->airTransport->getTravelCostTotal();
        return $totalCost / $this->getDistanceTravelled();
    }
}
