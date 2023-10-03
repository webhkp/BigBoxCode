<?php
// Transport.php

namespace BigBoxCode\DesignPattern\TemplateMethod\Transport;

abstract class Transport {
    abstract function createBody(): void;
    abstract function addEngine(): void;
    abstract function addWheel(): void;
    abstract function addWing(): void;

    private function addSeat(): void {
        echo "Adding seats - Common process\n";
    }

    private function paint(): void {
        echo "Painting - Common process\n";
    }

    public function build(): void {
        $this->createBody();
        $this->addEngine();
        $this->addWheel();
        $this->addWing();
        $this->addSeat();
        $this->paint();
    }
}