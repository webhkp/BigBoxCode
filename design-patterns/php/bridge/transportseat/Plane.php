<?php
// Plane.php

namespace BigBoxCode\DesignPattern\Bridge\TransportSeat;

class Plane extends Transport {
    public function __construct(Seat $seat) {
        parent::__construct($seat);
    }

    public function selectTransport(): void {
        echo "Plane selected for transport\n";

        $this->seat->selectSeat();
    }
}