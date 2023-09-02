<?php
// Bike.php

namespace BigBoxCode\DesignPattern\Composite\TransportList;


class Bike implements Transport {
    public function start(): void {
        echo "Starting Bike...\n";
    }

    public function operate(): void {
        echo "Riding Bike\n";
    }

    public function stop(): void {
        echo "Stopping Bike...\n";
    }
}