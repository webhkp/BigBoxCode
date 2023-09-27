<?php
// Weather.php

namespace BigBoxCode\DesignPattern\Observer\Weather;

class Weather implements \SplSubject {
    private WeatherInfo $weatherInfo;

    public function attach(\SplObserver $observer): void {

    }
}