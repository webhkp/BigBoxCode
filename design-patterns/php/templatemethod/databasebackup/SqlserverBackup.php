<?php
// SqlserverBackup.php

namespace BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup;

class SqlserverBackup extends DatabaseBackup {
    public function __construct(string $location) {
        parent::__construct($location);
    }

    protected function dump(): void {
        // Dump SQL Server database
        // Write specific process
        // for specifically SQL Server DB backup

        echo "Performing steps for SQL Server dump\n";
    }
}