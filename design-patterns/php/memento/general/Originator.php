<?php
// Originator.php

namespace BigBoxCode\DesignPattern\Memento\General;

class Originator {
    private string $state = '';

    public function setState(string $state): void {
        $this->state = $state;
    }

    public function getState(): string {
        return $this->state;
    }

    public function setMemento(): Memento {
        echo "Memento Saved with timestamp => " . $this->state . "\n";

        return new Memento($this->state);
    }

    public function getMementoState(Memento $memento): void {
        $this->state = $memento->getState();
    }
}