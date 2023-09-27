<?php
// ObserverTwo.php

namespace BigBoxCode\DesignPattern\Observer\Player;


class Commentator implements \SplObserver {
    public function __construct(private string $name) {

    }

    public function update(\SplSubject $player): void {
        echo "\nPlayer update received in Commentator : " . $this->name . "\n";
        echo "Player name: " . $player->name . "\n";
        echo "score: " . $player->score . "\n";
    }
}