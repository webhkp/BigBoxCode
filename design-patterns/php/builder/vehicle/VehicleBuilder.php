<?php
// VehicleBuilder.php

namespace Builder\Vehicle;

interface VehicleBuilder {
    public function addWheel(int $noOfWheel): void;
    public function addEngine(int $noOfEngine): void;
    public function addSeat(int $noOfSeat): void;
    public function addInterior(): void;
    public function addDoor(int $noOfDoor): void;
    public function addWing(int $noOfWing): void;
}