<?php
// SqliteBackup.php

namespace BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup;

class SqliteBackup extends DatabaseBackup {
    public function __construct(string $location) {
        parent::__construct($location);
    }

    protected function dump(): void {
        // Dump SQLite database
        // Write specific process
        // for specifically SQLite DB backup

        echo "Performing steps for SQLite database dump\n";
    }
}