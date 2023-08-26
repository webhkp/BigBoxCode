<?php
// NativeApi.php

namespace BigBoxCode\DesignPattern\Adapter\FileAdapter;


class NativeApi implements Api {
    public function fetchData(): string {
        echo "Fetching data from Native API\n";

        return "Data read from Native Api";
    }

    public function sendData(string $data): void {
        echo "Sending data to Native API: " . $data . "\n";
    }
}