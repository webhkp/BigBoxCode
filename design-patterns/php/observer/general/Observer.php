<?php
// Observer.php

namespace BigBoxCode\DesignPattern\Observer\General;

abstract class Observer {
    protected ?Subject $subject = null;

    abstract function sendUpdate(): void;
}