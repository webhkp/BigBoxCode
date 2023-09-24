<?php
// ObserverTwo.php

namespace BigBoxCode\DesignPattern\Observer\General;

class ObserverTwo extends Observer {
    public function __construct(Subject $subject) {
        $this->subject = $subject;
        $this->subject->attach($this);
    }

    public function sendUpdate(): void {
        echo "Received in ObserverTwo: " . $this->subject?->getState() . "\n";
    }
}