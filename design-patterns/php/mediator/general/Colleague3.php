<?php
// Colleague3.php

namespace BigBoxCode\DesignPattern\Mediator\General;

class Colleague3 extends Colleague {
    public function __construct(Mediator $mediator) {
        parent::__construct($mediator);
    }

    public function sendMessage(Colleague $colleague, string $msg): void {
        // Here can be some additional processing 
        // specific to this colleague for message
        // prcessing/parsing/altering/formatting
        $this->mediator->sendMessage($colleague, $msg);
    }

    public function receiveMessage(string $msg): void {
        // Here can be some additional processing 
        // specific to this colleague for message
        // prcessing/parsing/altering/formatting
        echo "Message received in Colleague3: " . $msg . "\n";
    }
}