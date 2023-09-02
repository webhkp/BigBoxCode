<?php
// Car.php

namespace BigBoxCode\DesignPattern\Composite\TransportList;


class Car implements Transport {
    public function start(): void {
        echo "Starting Car...\n";
    }

    public function operate(): void {
        echo "Driving Car\n";
    }

    public function stop(): void {
        echo "Stopping Car...\n";
    }
}