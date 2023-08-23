<?php
// AirTransportFactory.php

namespace BigBoxCode\DesignPattern\Factory\TransportMethod;

class AirTransportFactory extends TransportFactory {
    public function getTransport(string $name): ?Transport {
        switch (strtolower($name)) {
            case "plane":
                return new Plane();
            case "helicopter":
                return new Helicopter();
        }

        return null;
    }
}