<?php
// Toll.php

namespace BigBoxCode\DesignPattern\Facade\TravelPlan;

use BigBoxCode\DesignPattern\Facade\TravelPlan\Point;

class Toll {
    public function getTollPoints(float $lat, float $lng): array {
        $points = [];

        for ($i = 0; $i < 10; $i++) {
            // This is some random calculation for demo purpose
            $currentLat = rand(0, 180);
            $currentLng = rand(0, 180);

            $points[$i] = new Point($currentLat, $currentLng);
        }

        return $points;
    }

    public function getTollAmount(float $tollPointId): float {
        // This is some random calculation for demo purpose
        return rand(0, 100);
    }

    public function getTotalToll(float $lat, float $lng): float {
        // This is some random calculation for demo purpose
        return rand(0, 100);
    }
}