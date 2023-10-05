<?php
// HostingCalculatorVisitorImpml.php

namespace BigBoxCode\DesignPattern\Visitor\HostingCost;

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