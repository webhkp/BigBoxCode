<?php
// CricketPlayer.php

namespace BigBoxCode\DesignPattern\Composite\PlayerGroup;


class CricketPlayer implements Player {
    public function __construct(
        private string $name,
        private int $age,
        private int $run
    ) {
       
    }

    public function printDetails(): void {
        echo "\nGame: Cricket";
        echo "\nName: " . $this->name;
        echo "\nAge: " . $this->age;
        echo "\nRuns: " . $this->run;
    }
}