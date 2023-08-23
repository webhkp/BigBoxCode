<?php
// demo.php

<?php

interface Service {
    public function accept(HostingCalculatorVisitor $hostingCalculatorVisitor): float;
}

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

interface HostingCalculatorVisitor {
    public function visitComputeService(ComputeService $computeService): float;
    public function visitDatabaseService(DatabaseService $databaseService): float;
    public function visitFileStorageService(FileStorageService $fileStorageService): float;
    public function visitServerlessService(ServerlessService $serverlessService): float;
    public function visitContainerService(ContainerService $containerService): float;
}

class HostingCalculatorVisitorImpl implements HostingCalculatorVisitor {
    public function visitComputeService(ComputeService $computeService): float {
        return $computeService->getPrice() * $computeService->getQuantity();
    }

    public function visitDatabaseService(DatabaseService $databaseService): float {
        $serviceCost = $databaseService->getPrice() * $databaseService->getQuantity();
        $backupCost = 0;

        if ($databaseService->isBackupEnabled()) {
            $backupCost = $databaseService->getBackupPrice() * $databaseService->getQuantity();
        }

        return $serviceCost + $backupCost;
    }

    public function visitFileStorageService(FileStorageService $fileStorageService): float {
        return $fileStorageService->getPricePerGB() * $fileStorageService->getQuantity();
    }

    public function visitServerlessService(ServerlessService $serverlessService): float {
        return $serverlessService->getHourlyPrice() * $serverlessService->getTotalHours();
    }

    public function visitContainerService(ContainerService $containerService): float {
        return $containerService->getPrice() * $containerService->getQuantity();
    }
}

class Demo {
    public static function main(array $args) {
        $usedServices = [
            new ComputeService(3),
            new DatabaseService(3, true),
            new FileStorageService(120),
            new ServerlessService(720),
            new ContainerService(2),
        ];

        $totalCost = self::calculateHostingCost($usedServices);

        echo "Total cost of hosting is: " . $totalCost . "\n";
    }

    private static function calculateHostingCost(array $services): float {
        $hostingCalculatorVisitorImpl = new HostingCalculatorVisitorImpl();

        $totalCost = 0;

        foreach ($services as $service) {
            $totalCost += $service->accept($hostingCalculatorVisitorImpl);
        }

        return $totalCost;
    }
}

// Call the main method
Demo::main([]);
