<?php
// ThirdPartyApi.php

namespace BigBoxCode\DesignPattern\Adapter\FileAdapter;


class ThirdPartyApi implements Api {
    public function fetchData(): string {
        echo "Fetching data from Third Party API\n";

        return "Data read from Third Party Api";
    }

    public function sendData(string $data): void {
        echo "Sending data to Third Party API: " . $data . "\n";
    }
}