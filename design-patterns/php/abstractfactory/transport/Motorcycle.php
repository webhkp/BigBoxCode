<?php
// Motorcycle.php

namespace BigBoxCode\DesignPattern\AbstractFactory\Transport;

class Motorcycle implements Transport {
    public function start(): void {
        echo "Motorcycle Started\n";
    }

    public function stop(): void {
        echo "Motorcycle Stopped\n";
    }

    public function repair(): void {
        echo "Motorcycle Repair\n";
    }
}