<?php
// FootballPlayer.php

namespace BigBoxCode\DesignPattern\Composite\PlayerGroup;


class FootballPlayer implements Player {
    public function __construct(
        private string $name,
        private int $age,
        private int $goal
    ) {

    }

    public function printDetails(): void {
        echo "\nGame: Football";
        echo "\nName: " . $this->name;
        echo "\nAge: " . $this->age;
        echo "\nGoals: " . $this->goal;
    }
}