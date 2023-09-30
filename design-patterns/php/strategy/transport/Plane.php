<?php
// Plane.php

namespace BigBoxCode\DesignPattern\Strategy\Transport;


class Plane implements Transport {
    public function start(): void {
        echo "Plane started\n";
    }

    public function stop(): void {
        echo "Plane stopped\n";
    }

    public function repair(): void {
        echo "Plane repair\n";
    }

    public function getInfo(): void {
        echo "Transport type: Plane\n";
        echo "Number of wheels: 3\n";
        echo "Average Weight: 50,000 Pounds\n";
    }

    public function operate(): void {
        echo "Flying plane ............\n";
    }
}
