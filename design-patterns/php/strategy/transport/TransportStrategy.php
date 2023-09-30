<?php
// TransportStrategy->php

namespace BigBoxCode\DesignPattern\Strategy\Transport;


class TransportStrategy {
    public function __construct(private Transport $transport) {
    }

    public function setStrategy(Transport $transport) {
        $this->transport = $transport;
    }
    
    public function execute(): void {
        $this->transport->start();

        $this->transport->getInfo();

        $this->transport->operate();
    }

    public function repair(): void {
        $this->transport->repair();
    }

    public function stop(): void {
        $this->transport->stop();
    }
}