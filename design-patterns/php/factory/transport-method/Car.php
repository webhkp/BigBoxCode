<?php
// Car.php

namespace Factory\TransportMethod;

class Car implements Transport {
    public function start() {
        echo "Car started\n";
    }

    public function stop() {
        echo "Car Stopped\n";
    }

    public function repair() {
        echo "Car Repair\n";
    }
}