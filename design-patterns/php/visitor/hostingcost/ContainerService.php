<?php
// ContainerService.php

namespace BigBoxCode\DesignPattern\Visitor\HostingCost;

class ContainerService implements Service {
    private const PRICE = 5.60;
    private int $quantity;

    public function __construct(int $quantity) {
        $this->quantity = $quantity;
    }

    public function getPrice(): float {
        return self::PRICE;
    }

    public function getQuantity(): int {
        return $this->quantity;
    }

    public function accept(HostingCalculatorVisitor $hostingCalculatorVisitor): float {
        return $hostingCalculatorVisitor->visitContainerService($this);
    }
}