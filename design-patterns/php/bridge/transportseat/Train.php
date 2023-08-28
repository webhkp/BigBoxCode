<?php
// Train.php

namespace BigBoxCode\DesignPattern\Bridge\TransportSeat;


class Train extends Transport {
    public function __construct(Seat $seat) {
        parent::__construct($seat);
    }

    public function selectTransport(): void {
        echo "Train selected for transport\n";
        $this->seat->selectSeat();
    }
}