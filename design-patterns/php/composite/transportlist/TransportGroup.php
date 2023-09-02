<?php
// TransportGroup.php

namespace BigBoxCode\DesignPattern\Composite\TransportList;

class TransportGroup implements Transport {
    private array $transportList = [];

    public function start(): void {
        foreach ($this->transportList as $transport) {
            $transport->start();
        }
    }

    public function operate(): void {
        foreach ($this->transportList as $transport) {
            $transport->operate();
        }
    }

    public function stop(): void {
        foreach ($this->transportList as $transport) {
            $transport->stop();
        }
    }

    public function addTransport(Transport $transport): void {
        array_push($this->transportList, $transport);
    }

    public function removeTransport(Transport $transport): void {
        $elemIndex = array_search($transport, $this->transportList);

        if ($elemIndex !== false) {
            unset($this->transportList[$elemIndex]);
        }
    }
}