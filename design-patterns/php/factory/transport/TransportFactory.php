<?php
// TransportFactory.php

namespace BigBoxCode\DesignPattern\Factory\Transport;

class TransportFactory {

    public static function getTransport(string $type): ?Transport {
        switch (strtolower($type)) {
            case "bike":
                return new Bike();
            case "car":
                return new Car();
            case "plane":
                return new Plane();
        }

        return null;
    }
}