<?php
// EconomyClassSeat.php

namespace BigBoxCode\DesignPattern\Bridge\TransportSeat;


class EconomyClassSeat implements Seat {
    public function selectSeat(): void {
        echo "Select an Economy class seat\n";
    }
}