<?php
// PlayerGroup.php

namespace BigBoxCode\DesignPattern\Composite\PlayerGroup;

class PlayerGroup implements Player {
    private array $playerList = [];

    public function printDetails(): void {
        foreach ($this->playerList as $player) {
            $player->printDetails();
        }
    }

    public function addElement(Player $player): void {
        array_push($this->playerList, $player);
    }

    public function removeElement(Player $player): void {
        $index = array_search($player, $this->playerList);

        if ($index !== false) {
            unset($this->playerList[$index]);
        }
    }
}