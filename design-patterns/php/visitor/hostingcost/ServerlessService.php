<?php
// ServerlessService.php

namespace BigBoxCode\DesignPattern\Visitor\HostingCost;

class ServerlessService implements Service {
    private const HOURLY_PRICE = 0.32;
    private int $totalHours;

    public function __construct(int $totalHours) {
        $this->totalHours = $totalHours;
    }

    public function getHourlyPrice(): float {
        return self::HOURLY_PRICE;
    }

    public function getTotalHours(): int {
        return $this->totalHours;
    }

    public function accept(HostingCalculatorVisitor $hostingCalculatorVisitor): float {
        return $hostingCalculatorVisitor->visitServerlessService($this);
    }
}