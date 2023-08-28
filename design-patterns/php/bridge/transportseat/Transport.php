<?php
// Transport.php

namespace BigBoxCode\DesignPattern\Bridge\TransportSeat;

abstract class Transport {
    public function __construct(protected Seat $seat) {
    }

    abstract function selectTransport(): void;
}