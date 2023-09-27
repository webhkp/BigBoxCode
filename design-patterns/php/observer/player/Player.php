<?php
// ConcreteSubject.php

namespace BigBoxCode\DesignPattern\Observer\Player;

class Player implements \SplSubject {
    public string $namme;
    public int $score;

    private \SplObjectStorage $observers;

    public function __construct(string $name) {
        $this->name = $name;

        $this->observers = new \SplObjectStorage;
    }

    public function setScore(int $score): void {
        $this->score = $score;
        $this->notify();
    }

    public function attach(\SplObserver $observer): void {
        $this->observers->attach($observer);
    }

    public function detach(\SplObserver $observer): void {
        $this->observers->detach($observer);
    }

    public function notify(): void {
        foreach ($this->observers as $observer) {
            $observer->update($this);
        }
    }
}