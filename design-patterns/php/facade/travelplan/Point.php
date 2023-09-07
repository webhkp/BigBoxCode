<?php
// Point.php

namespace BigBoxCode\DesignPattern\Facade\TravelPlan;


class Point {
    public function __construct(public float $lat, public float $lng) {
    }

    public function getLat(): float {
        return $this->lat;
    }

    public function getLng(): float {
        return $this->lng;
    }
}