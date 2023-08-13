<?php
// PlaneBuilder.php

namespace Builder\Vehicle;

class PlaneBuilder implements VehicleBuilder {
    private int $wheel = 0;
    private int $engine = 0;
    private int $seat = 0;
    private bool $interior;
    private int $door = 0;
    private int $wing = 0;

    public function addWheel(int $noOfWheel): void {
        echo "Add " . $noOfWheel . " wheels\n";

        $this->wheel += $noOfWheel;
    }

    public function addEngine(int $noOfEngine): void {
        echo "Add " . $noOfEngine . " engine\n";

        $this->engine += $noOfEngine;
    }

    public function addSeat(int $noOfSeat): void {
        echo "Add " . $noOfSeat . " Seat\n";

        $this->seat = $noOfSeat;
    }

    public function addInterior(): void {
        echo "Add interior\n";
        $this->interior = true;
    }

    public function addDoor(int $noOfDoor): void {
        echo "Add " . $noOfDoor . " door\n";

        $this->door += $noOfDoor;
    }

    public function addWing(int $noOfWing): void {
        echo "Add " . $noOfWing . " wing\n";

        $this->wing += $noOfWing;
    }

    public function build(): Plane {
        return new Plane($this->wheel, $this->engine, $this->seat, $this->door, $this->wing, $this->interior);
    }
}