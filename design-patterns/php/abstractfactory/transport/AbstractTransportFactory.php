<?php
// AbstractTransportFactory.php

namespace BigBoxCode\DesignPattern\AbstractFactory\Transport;


interface AbstractTransportFactory {
    public function getTransport(string $type): ?Transport;
}