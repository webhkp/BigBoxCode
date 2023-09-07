<?php
// Direction.php

namespace BigBoxCode\DesignPattern\Facade\TravelPlan;

use BigBoxCode\DesignPattern\Facade\TravelPlan\Point;

class Direction {
    public function __construct(
        private float $startLat,
        private float $startLng,
        private float $endLat,
        private float $endLng
    ) {
    }

    public function getLocationDetails(float $lat, float $lng) {
        echo "Country: ABC\n";
        echo "City: DEF\n";
        echo "State: GHI\n";
        echo "Zip: 101010\n";
    }

    public function getCurrentLocation(): Point {
        // This is some random calculation for demo purpose
        $currentLat = rand(0, 180);
        $currentLng = rand(0, 180);

        return new Point($currentLat, $currentLng);
    }

    public function getNextMove(): string {
        // This is some random calculation for demo purpose
        $nextMoves = ["straight", "left", "right"];
        return $nextMoves[rand(0, 2)];
    }

    public function getFullRoute(): array {
        $points = [];

        for ($i = 0; $i < 10; $i++) {
            // This is some random calculation for demo purpose
            $currentLat = (rand(0, 180) * ((90 - (-90) * 10 + 1) - 90 * 10)) / 10.0;
            $currentLng = (rand(0, 180) * ((180 - (-180) * 10 + 1) - 180 * 10)) / 10.0;

            $points[$i] = new Point($currentLat, $currentLng);
        }

        return $points;
    }
}