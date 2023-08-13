<?php
// TransportFactory.php

namespace Factory\Transport;

class TransportFactory {

    public static function getTransport($type) {
        if ($type == NULL) {
            return NULL;
        }

        if (strtolower($type) == strtolower("bike")) {
            return new Bike();
        }

        if (strtolower($type) == strtolower("car")) {
            return new Car();
        }

        if (strtolower($type) == strtolower("plane")) {
            return new Plane();
        }

        return NULL;
    }
}