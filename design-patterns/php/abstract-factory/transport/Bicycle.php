<?php
// Bicycle.php

namespace AbstractFactory\Transport;


class Bicycle implements Transport {
    public function start(): void {
        echo "Bicycle Started\n";
    }

    public function stop(): void {
        echo "Bicycle Stopped\n";
    }

    public function repair(): void {
        echo "Bicycle Repair\n";
    }
}