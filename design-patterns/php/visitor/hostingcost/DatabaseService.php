<?php
// DatabaseService.php

namespace BigBoxCode\DesignPattern\Visitor\HostingCost;

class DatabaseService implements Service {
    private const PRICE = 100.00;
    private const BACKUP_PRICE = 30.00;
    private int $quantity;
    private bool $backupEnabled;

    public function __construct(int $quantity, bool $backupEnabled = false) {
        $this->quantity = $quantity;
        $this->backupEnabled = $backupEnabled;
    }

    public function getPrice(): float {
        return self::PRICE;
    }

    public function getQuantity(): int {
        return $this->quantity;
    }

    public function getBackupPrice(): float {
        return self::BACKUP_PRICE;
    }

    public function isBackupEnabled(): bool {
        return $this->backupEnabled;
    }

    public function accept(HostingCalculatorVisitor $hostingCalculatorVisitor): float {
        return $hostingCalculatorVisitor->visitDatabaseService($this);
    }
}
