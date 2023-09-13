<?php
// Data.php

namespace BigBoxCode\DesignPattern\ChainOfResponsibility\Cache;


enum DATA_TYPE {
    case DATA;
    case JAVASCRIPT;
    case CSS;
}

class Data {
    public function __construct(
        private DATA_TYPE $type,
        private string $key,
        private string $data
    ) {

    }

    public function getType(): DATA_TYPE {
        return $this->type;
    }

    public function getKey(): string {
        return $this->key;
    }

    public function getData(): string {
        return $this->data;
    }
}