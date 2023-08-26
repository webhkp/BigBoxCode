<?php
// Transport.php

namespace BigBoxCode\DesignPattern\Adapter\TransportAdapter;


interface Transport {
    public function getNumberOfWheels(): int;
    public function getWeight(): float;
    public function getDistanceTravelled(): float;
    public function getTravelCostPerMile(): float;
}