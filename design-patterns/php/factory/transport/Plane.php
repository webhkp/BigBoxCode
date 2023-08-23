<?php
// Plane.php

namespace BigBoxCode\DesignPattern\Factory\Transport;

class Plane implements Transport {
    public function start() {
        echo "Plane started\n";
    }

    public function stop() {
        echo "Plane Stopped\n";
    }

    public function repair() {
        echo "Plane Repair\n";
    }
}