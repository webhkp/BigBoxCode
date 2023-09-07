<?php
// Weather.php

namespace BigBoxCode\DesignPattern\Facade\TravelPlan;

class Weather {
    public function getWeatherInfo(float $lat, float $lng): void {
        echo "Temperature: 20.7\n";
        echo "Precipitation: 1%\n";
        echo "Humidity: 73%\n";
        echo "Wind: 8 km/h\n";
    }
}