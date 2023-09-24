<?php
// Caretaker.php

namespace BigBoxCode\DesignPattern\Memento\General;


class Caretaker {

    private array $mementoList = [];

    public function add(Memento $memento): void {
        array_push($this->mementoList, $memento);
    }

    public function getByIndex(int $index): Memento {
        return $this->mementoList[$index];
    }

    public function getCurrent(): Memento {
        return $this->mementoList[count($this->mementoList) - 1];
    }

    public function undo(): void {
        unset($this->mementoList[count($this->mementoList) - 1]);
    }
}