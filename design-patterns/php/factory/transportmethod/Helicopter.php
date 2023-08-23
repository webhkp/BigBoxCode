<?php
// Helicopter.php

namespace BigBoxCode\DesignPattern\Factory\TransportMethod;

class Helicopter implements Transport {
    public function start() {
        echo "Helicopter started\n";
    }

    public function stop() {
        echo "Helicopter Stopped\n";
    }

    public function repair() {
        echo "Helicopter Repair\n";
    }
}