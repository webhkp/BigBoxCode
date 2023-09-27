<?php
// WeatherInfo.php

namespace BigBoxCode\DesignPattern\Observer\Weather;

class WeatherInfo {
    private float $temperature;

    public function getTemperature(): float {
        return $this->temperature;
    }
    
    public function setTemperature(float $temperature) {
        $this->temperature = $temperature;
    }
}