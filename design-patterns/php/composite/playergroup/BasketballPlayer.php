<?php
// BasketballPlayer.php

namespace BigBoxCode\DesignPattern\Composite\PlayerGroup;


class BasketballPlayer implements Player {

    public function __construct(
        private string $name,
        private int $age,
        private int $point
    ) {

    }

    public function printDetails(): void {
        echo "\nGame: Basketball";
        echo "\nName: " . $this->name;
        echo "\nAge: " . $this->age;
        echo "\nPoints: " . $this->point;
    }
}