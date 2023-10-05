<?php
// FileStorageService.php

namespace BigBoxCode\DesignPattern\Visitor\HostingCost;


class FileStorageService implements Service {
    private const PRICE_PER_GB = 1.70;
    private int $quantity;

    public function __construct(int $quantity) {
        $this->quantity = $quantity;
    }

    public function getPricePerGB(): float {
        return self::PRICE_PER_GB;
    }

    public function getQuantity(): int {
        return $this->quantity;
    }

    public function accept(HostingCalculatorVisitor $hostingCalculatorVisitor): float {
        return $hostingCalculatorVisitor->visitFileStorageService($this);
    }
}