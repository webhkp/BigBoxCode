<?php
// Transport.php

namespace AbstractFactory\Transport;

interface Transport {
    public function start(): void;
    public function stop(): void;
    public function repair(): void;
}