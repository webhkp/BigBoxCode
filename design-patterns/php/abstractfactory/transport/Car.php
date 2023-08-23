<?php
// Car.php

namespace BigBoxCode\DesignPattern\AbstractFactory\Transport;

class Car implements Transport {
    public function start(): void {
        echo "Car Started\n";
    }

    public function stop(): void {
        echo "Car Stopped\n";
    }

    public function repair(): void {
        echo "Car Repair\n";
    }
}