<?php
// FourWheelTransportFactory.php

namespace BigBoxCode\DesignPattern\AbstractFactory\Transport;

class FourWheelTransportFactory implements AbstractTransportFactory {
    public function getTransport(string $type): ?Transport {
        if (strcasecmp($type, "car") === 0) {
            return new Car();
        }

        if (strcasecmp($type, "truck") === 0) {
            return new Truck();
        }

        return null;
    }
}