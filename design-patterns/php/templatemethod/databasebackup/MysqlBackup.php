<?php
// MysqlBackup.php

namespace BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup;

class MysqlBackup extends DatabaseBackup {
    public function __construct(string $location) {
        parent::__construct($location);
    }

    protected function dump(): void {
        // Dump MySQL database
        // Write specific process
        // for specifically MySQL DB backup

        echo "Performing steps for MySQL database dump\n";
    }
}