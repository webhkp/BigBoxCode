<?php
// Car.php

namespace BigBoxCode\DesignPattern\Facade\TravelPlan;

class Car {
    public function startEngine(): void {
        echo "Start Engine\n";
    }

    public function stopEngine(): void {
        echo "Stop Engine\n";
    }

    public function goStraight(): void {
        echo "Go Straight: ↑\n";
    }

    public function goLeft(): void {
        echo "Go Left: ←\n";
    }

    public function goRight(): void {
        echo "Go Right: →\n";
    }

    public function getDistanceTravelled(): float {
        // This is some random calculation for demo purpose
        return ((rand(0, 180) * ((10000 - 100) * 10 + 1)) + 100 * 10) / 10.0;
    }
}