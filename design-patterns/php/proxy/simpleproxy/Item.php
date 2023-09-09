<?php
// Item.php

namespace BigBoxCode\DesignPattern\Proxy\SimpleProxy;

class Item implements ProxyInterface {
    public function operation1(): void {
        echo "Performing operation 1 in the Actual Object\n";
    }

    public function operation2(): void {
        echo "Performing operation 2 in the Actual Object\n";
    }
}