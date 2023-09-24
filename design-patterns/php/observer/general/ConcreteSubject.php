<?php
// ConcreteSubject.php

namespace BigBoxCode\DesignPattern\Observer\General;

class ConcreteSubject implements Subject {
    private int $state = 0;
    private array $observerList = [];

    public function getState(): int {
        return $this->state;
    }

    public function setState(int $state): void {
        $this->state = $state;
        $this->notifyObservers();
    }

    public function attach(Observer $observer): void {
        array_push($this->observerList, $observer);
    }

    public function notifyObservers(): void {
        foreach ($this->observerList as $observer) {
            $observer->sendUpdate();
        }
    }
}