<?php
// ObserverOne.php

namespace BigBoxCode\DesignPattern\Observer\Player;

class Referee implements \SplObserver {
    public function __construct(private string $code) {

    }

    public function update(\SplSubject $player): void {
        echo "\nPlayer update received in Referee : " . $this->code . "\n";
        echo "Player name: " . $player->name . "\n";
        echo "score: " . $player->score . "\n";
    }
}