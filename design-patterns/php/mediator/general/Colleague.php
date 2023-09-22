<?php
// Colleague.php

namespace BigBoxCode\DesignPattern\Mediator\General;

abstract class Colleague {
    public function __construct(protected Mediator $mediator) {
    }

    abstract function sendMessage(Colleague $colleague, string $message): void;
    abstract function receiveMessage(string $message): void;
}