<?php
// ObserverTwo.php

namespace BigBoxCode\DesignPattern\Observer\Player;


class ScoreBoard implements \SplObserver {
    public function update(\SplSubject $player): void {
        echo "\nPlayer update received in Score Board -\n";
        echo "Player name: " . $player->name . "\n";
        echo "score: " . $player->score . "\n";
    }
}