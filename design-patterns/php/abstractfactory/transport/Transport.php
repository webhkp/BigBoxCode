<?php
// Transport.php

namespace BigBoxCode\DesignPattern\AbstractFactory\Transport;

interface Transport {
    public function start(): void;
    public function stop(): void;
    public function repair(): void;
}