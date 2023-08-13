<?php
// TransportFactory.php

namespace Factory\TransportMethod;

abstract class TransportFactory {
    public function operateTransport(string $name) {
        $transport = $this->getTransport($name);

        $transport->start();
        $transport->stop();
    }

    public function repairTransport(string $name) {
        $transport = $this->getTransport($name);

        $transport->repair();
    }

    public abstract function getTransport(string $name): ?Transport;
}