<?php
// VehicleProducer.php

namespace Builder\Vehicle;

class VehicleProducer {
    public function buildCar(CarBuilder $carBuilder): CarBuilder {
        $carBuilder->addWheel(4);
        $carBuilder->addEngine(1);
        $carBuilder->addDoor(4);
        $carBuilder->addSeat(4);
        $carBuilder->addInterior();
        
        return $carBuilder;
    }

    public function buildPlane(PlaneBuilder $planeBuilder): PlaneBuilder {
        $planeBuilder->addWheel(3);
        $planeBuilder->addEngine(2);
        $planeBuilder->addDoor(4);
        $planeBuilder->addSeat(120);
        $planeBuilder->addInterior();

        try {
            $planeBuilder->addWing(2);
        } catch (\Exception $e) {
            throw new \RuntimeException($e);
        }

        return $planeBuilder;
    }
}