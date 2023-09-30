<?php
// Bike.php

namespace BigBoxCode\DesignPattern\Strategy\Transport;


class Bike implements Transport {
    public function start(): void {
        echo "Bike started\n";
    }
    
    public function stop(): void {
        echo "Bike stopped\n";
    }

    public function repair(): void {
        echo "Bike repair\n";
    }

    public function getInfo(): void {
        echo "Transport type: Bike\n";
        echo "Number of wheels: 2\n";
        echo "Average Weight: 700 Pounds\n";
    }

    public function operate(): void {
        echo "Riding Bike ............\n";
    }
}