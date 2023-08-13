<?php
// AbstractTransportFactory.php

namespace AbstractFactory\Transport;


interface AbstractTransportFactory {
    public function getTransport(string $type): ?Transport;
}