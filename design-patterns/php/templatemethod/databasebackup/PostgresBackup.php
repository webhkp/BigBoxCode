<?php
// PostgresBackup.php

namespace BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup;

class PostgresBackup extends DatabaseBackup {
    public function __construct(string $location) {
        parent::__construct($location);
    }

    protected function dump(): void {
        // Dump Postgres database
        // Write specific process
        // for specifically Postgres DB backup

        echo "Performing steps for Postgres database dump\n";
    }
}