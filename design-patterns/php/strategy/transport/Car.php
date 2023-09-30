<?php
// Car.php

namespace BigBoxCode\DesignPattern\Strategy\Transport;


class Car implements Transport {
    public function start(): void {
        echo "Car started\n";
    }

    public function stop(): void {
        echo "Car stopped\n";
    }

    public function repair(): void {
        echo "Car repair\n";
    }

    public function getInfo(): void {
        echo "Transport type: Car\n";
        echo "Number of wheels: 4\n";
        echo "Average Weight: 4,000 Pounds\n";
    }

    public function operate(): void {
        echo "Driving car ............\n";
    }
}