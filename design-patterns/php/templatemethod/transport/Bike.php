<?php
// Bike.php

namespace BigBoxCode\DesignPattern\TemplateMethod\Transport;

class Bike extends Transport {
    public function createBody(): void {
        echo "Creating Bike Body\n";
    }

    public function addEngine(): void {
        echo "Adding Engine to Bike\n";
    }

    public function addWheel(): void {
        echo "Adding 2 Wheels to Bike\n";
    }

    public function addWing(): void {
        // not required for Bike
    }
}