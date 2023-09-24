<?php
// Memento.php

namespace BigBoxCode\DesignPattern\Memento\General;


class Memento {

    public function __construct(private string $state) {
    }

    public function getState(): string {
        return $this->state;
    }
}