<?php
// Plane.php

namespace Builder\Vehicle;


class Plane {
    private int $wheel;
    private int $engine;
    private int $seat;
    private int $door;
    private int $wing;
    private bool $interior;

    public function __construct(int $noOfWheel, int $noOfEngine, int $noOfSeat, int $noOfDoor, int $wing, bool $interior) {
        $this->wheel = $noOfWheel;
        $this->engine = $noOfEngine;
        $this->seat = $noOfSeat;
        $this->door = $noOfDoor;
        $this->wing = $wing;
        $this->interior = $interior;
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

    public function getWing(): int {
        return $this->wing;
    }

    public function isInterior(): bool {
        return $this->interior;
    }

    public function __toString(): string {
        return "Plane: Wheel -> " . $this->wheel . " | Engine -> " . $this->engine . " | Seat -> " . $this->seat . " | Door -> " . $this->door . " | Wing: " . $this->wing . " | Interior -> " . ($this->interior ? 'true' : 'false');
    }
}