<?php
// Subject.php

namespace BigBoxCode\DesignPattern\Observer\General;

interface Subject {
    function getState(): int;
    function setState(int $state): void;
    function attach(Observer $observer): void;
    function notifyObservers(): void;
}