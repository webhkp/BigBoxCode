<?php
// IMediator.php

namespace BigBoxCode\DesignPattern\Mediator\General;

interface IMediator {
    function sendMessage(Colleague $colleague, string $msg): void;
}