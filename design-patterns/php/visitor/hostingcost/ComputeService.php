<?php
// ComputeService.php

namespace BigBoxCode\DesignPattern\Visitor\HostingCost;

class ComputeService implements Service {
    private const PRICE = 10.50;
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
        return $hostingCalculatorVisitor->visitComputeService($this);
    }
}