<?php
// TravelFacade.php

namespace BigBoxCode\DesignPattern\Facade\TravelPlan;

class TravelFacade {
    private float $startLat;
    private float $startLng;

    private float $endLat;
    private float $endLng;

    private Direction $direction;
    private Toll $toll;
    private Car $car;
    private Weather $weather;

    // define constructor
    public function __construct(float $startLat, float $startLng, float $endLat, float $endLng) {
        $this->startLat = $startLat;
        $this->startLng = $startLng;
        $this->endLat = $endLat;
        $this->endLng = $endLng;

        // Initialize classes
        $this->direction = new Direction($startLat, $startLng, $endLat, $endLng);
        $this->car = new Car();
        $this->toll = new Toll();
        $this->weather = new Weather();
    }

    public function getRoute(): array {
        return $this->direction->getFullRoute();
    }

    public function getLocationInfo(float $lat, float $lng): void {
        $this->direction->getLocationDetails($lat, $lng);
        $this->weather->getWeatherInfo($lat, $lng);
    }

    public function getCurrentLocation(): Point {
        return $this->direction->getCurrentLocation();
    }

    public function operateCar(): void {
        $fullRoute = $this->direction->getFullRoute();

        $this->car->startEngine();

        foreach ($fullRoute as $point) {
            $nextMove = $this->direction->getNextMove();

            switch ($nextMove) {
                case "straight":
                    $this->car->goStraight();
                    break;
                case "left":
                    $this->car->goLeft();
                    break;
                case "right":
                    $this->car->goRight();
                    break;
            }
        }

        $this->car->stopEngine();
    }

    public function getTotalTollAmount(float $lat, float $lng) {
        echo "Total Toll Amount: " . $this->toll->getTotalToll($lat, $lng) . "\n";
    }

}