<?php
// Proxy.php

namespace BigBoxCode\DesignPattern\Proxy\SimpleProxy;

class Proxy implements ProxyInterface {
    private ?ProxyInterface $item = null;

    public function operation1(): void {
        if ($this->item == null) {
            $this->item = new Item();
        }

        $this->item->operation1();
    }

    public function operation2(): void {
        if ($this->item == null) {
            $this->item = new Item();
        }

        $this->item->operation2();
    }
}