<?php
// ObserverOne.php

namespace BigBoxCode\DesignPattern\Observer\General;

class ObserverOne extends Observer {
    public function __construct(Subject $subject) {
        $this->subject = $subject;
        $this->subject->attach($this);
    }

    public function sendUpdate(): void {
        echo "Received in ObserverOne: " . $this->subject?->getState() . "\n";
    }
}