<?php
// Car.php

namespace BigBoxCode\DesignPattern\TemplateMethod\Transport;


class Car extends Transport {
    public function createBody(): void {
        echo "Creating Car Body\n";
    }

    public function addEngine(): void {
        echo "Adding Engine to Car\n";
    }

    public function addWheel(): void {
        echo "Adding 4 Wheels to Car\n";
    }

    public function addWing(): void {
        // Not required for Car
    }
}