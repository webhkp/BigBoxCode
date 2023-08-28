<?php
// BusinessClassSeat.php

namespace BigBoxCode\DesignPattern\Bridge\TransportSeat;

class BusinessClassSeat implements Seat {
    public function selectSeat(): void {
        echo "Select an Business class seat\n";
    }
}