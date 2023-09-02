<?php
// Plane.php

namespace BigBoxCode\DesignPattern\Composite\TransportList;

class Plane implements Transport {
    public function start(): void {
        echo "Starting Plane...\n";
    }

    public function operate(): void {
        echo "Flying Plane\n";
    }

    public function stop(): void {
        echo "Stopping Plane...\n";
    }
}