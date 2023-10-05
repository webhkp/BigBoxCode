<?php
// HostingCalculatorVisitor.php

namespace BigBoxCode\DesignPattern\Visitor\HostingCost;

interface HostingCalculatorVisitor {
    public function visitComputeService(ComputeService $computeService): float;
    public function visitDatabaseService(DatabaseService $databaseService): float;
    public function visitFileStorageService(FileStorageService $fileStorageService): float;
    public function visitServerlessService(ServerlessService $serverlessService): float;
    public function visitContainerService(ContainerService $containerService): float;
}