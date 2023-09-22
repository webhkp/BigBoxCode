<?php
// Mediator.php

namespace BigBoxCode\DesignPattern\Mediator\General;

class Mediator implements IMediator {
    public function sendMessage(Colleague $receiver, string $msg): void {
        $receiver->receiveMessage($msg);
    }
}