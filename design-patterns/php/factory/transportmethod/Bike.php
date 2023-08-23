<?php
// Bike.php

namespace BigBoxCode\DesignPattern\Factory\TransportMethod;

class Bike implements Transport {
    public function start() {
        echo "Bike started\n";
    }

    public function stop() {
        echo "Bike Stopped\n";
    }

    public function repair() {
        echo "Bike Repair\n";
    }
}