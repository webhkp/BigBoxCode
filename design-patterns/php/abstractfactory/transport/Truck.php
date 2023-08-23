<?php
// Truck.php

namespace BigBoxCode\DesignPattern\AbstractFactory\Transport;

class Truck implements Transport {
    public function start(): void {
        echo "Truck Started\n";
    }

    public function stop(): void {
        echo "Truck Stopped\n";
    }

    public function repair(): void {
        echo "Truck Repair\n";
    }
}