<?php
// Train.php

namespace BigBoxCode\DesignPattern\TemplateMethod\Transport;

class Train extends Transport {
    public function createBody(): void {
        echo "Creating Train Body\n";
    }

    public function addEngine(): void {
        echo "Adding Engine to Train\n";
    }

    public function addWheel(): void {
        echo "Adding Wheels to Train\n";
    }

    public function addWing(): void {
        // not required for train
    }
}