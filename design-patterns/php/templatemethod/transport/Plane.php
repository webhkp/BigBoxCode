<?php
// Plane.php

namespace BigBoxCode\DesignPattern\TemplateMethod\Transport;

class Plane extends Transport {
    public function createBody(): void {
        echo "Creating Plane Body\n";
    }

    public function addEngine(): void {
        echo "Adding Engine to Plane\n";
    }

    public function addWheel(): void {
        echo "Adding 3 Wheels to Plane\n";
    }

    public function addWing(): void {
        echo "Adding Wings Plane\n";
    }
}