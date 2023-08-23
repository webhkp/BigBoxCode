<?php
// CarBuilder.php

namespace BigBoxCode\DesignPattern\Builder\Vehicle;


class CarBuilder implements VehicleBuilder {
    private int $wheel = 0;
    private int $engine = 0;
    private int $seat = 0;
    private bool $interior;
    private int $door = 0;

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
        throw new \Exception("Can not add wings");
    }

    public function build(): Car {
        return new Car($this->wheel, $this->engine, $this->seat, $this->door, $this->interior);
    }
}