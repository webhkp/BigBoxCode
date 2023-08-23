<?php
// RoadTransportFactory.php

namespace BigBoxCode\DesignPattern\Factory\TransportMethod;

class RoadTransportFactory extends TransportFactory {
    public function getTransport(string $name): ?Transport {
        switch (strtolower($name)) {
            case "car":
                return new Car();
            case "bike":
                return new Bike();
            case "bus":
                return new Bus();
        }

        return null;
    }
}