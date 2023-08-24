<?php
// Plane.php

namespace BigBoxCode\DesignPattern\Prototype\Transport;

class Plane {
    private string $name;
    private string $manufacturer;
    private string $model;
    private float $length;
    private float $height;
    private float $wingspan;
    private float $seat;

    private PlaneEngine $engine;

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name) {
        $this->name = $name;
    }

    public function getManufacturer(): string {
        return $this->manufacturer;
    }

    public function setManufacturer(string $manufacturer) {
        $this->manufacturer = $manufacturer;
    }

    public function getModel(): string {
        return $this->model;
    }

    public function setModel(string $model) {
        $this->model = $model;
    }

    public function getLength(): float {
        return $this->length;
    }

    public function setLength(float $length) {
        $this->length = $length;
    }

    public function getHeight(): float {
        return $this->height;
    }

    public function setHeight(float $height) {
        $this->height = $height;
    }

    public function getWingspan(): float {
        return $this->wingspan;
    }

    public function setWingspan(float $wingspan) {
        $this->wingspan = $wingspan;

        return $this;
    }

    public function getSeat(): float {
        return $this->seat;
    }

    public function setSeat(float $seat) {
        $this->seat = $seat;
    }

    public function getEngine(): PlaneEngine {
        return $this->engine;
    }

    public function setEngine(PlaneEngine $engine) {
        $this->engine = $engine;

        return $this;
    }

    public function __clone() {
        // Set some prefix for the clone objects
        $this->name = "Clone of " . $this->name;

        // Clone the engine object to avoid referencing to the original
        $this->engine = clone $this->engine;
    }
}