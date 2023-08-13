<?php
// Bus.php

namespace Factory\TransportMethod;

class Bus implements Transport {
    public function start() {
        echo "Bus started\n";
    }

    public function stop() {
        echo "Bus Stopped\n";
    }

    public function repair() {
        echo "Bus Repair\n";
    }
}