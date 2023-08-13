<?php
// TwoWheelTransportFactory.php

namespace AbstractFactory\Transport;

class TwoWheelTransportFactory implements AbstractTransportFactory {
    public function getTransport(string $type): ?Transport {
        if (strcasecmp($type, "bicycle") === 0) {
            return new Bicycle();
        }

        if (strcasecmp($type, "motorcycle") === 0) {
            return new Motorcycle();
        }

        return null;
    }
}