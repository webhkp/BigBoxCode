<?php
// PlaneEngine.php

namespace BigBoxCode\DesignPattern\Prototype\Transport;

class PlaneEngine {
    private string $name;
    private float $length;
    private float $weight;
    private int $noOfBlade;
    private int $rpm;

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name) {
        $this->name = $name;
    }

    public function getLength(): float {
        return $this->length;
    }

    public function setLength(float $length) {
        $this->length = $length;
    }

    public function getWeight(): float {
        return $this->weight;
    }

    public function setWeight(float $weight) {
        $this->weight = $weight;
    }

    public function getNoOfBlade(): int {
        return $this->noOfBlade;
    }

    public function setNoOfBlade(int $noOfBlade) {
        $this->noOfBlade = $noOfBlade;
    }

    public function getRpm(): int {
        return $this->rpm;
    }

    public function setRpm(int $rpm) {
        $this->rpm = $rpm;
    }
}