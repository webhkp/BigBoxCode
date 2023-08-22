<?php
// Car.php

namespace Builder\Vehicle;

class Car {
    public function __construct(
        private int $wheel,
        private int $engine,
        private int $seat,
        private int $door,
        private bool $interior) {
    }

    public function getWheel(): int {
        return $this->wheel;
    }

    public function getEngine(): int {
        return $this->engine;
    }

    public function getSeat(): int {
        return $this->seat;
    }

    public function getDoor(): int {
        return $this->door;
    }

    public function isInterior(): bool {
        return $this->interior;
    }

    public function __toString(): string {
        return "Car: Wheel -> " . $this->wheel . " | Engine -> " . $this->engine . " | Seat -> " . $this->seat . " | Door -> " . $this->door . " | Interior -> " . ($this->interior ? 'true' : 'false');
    }
}