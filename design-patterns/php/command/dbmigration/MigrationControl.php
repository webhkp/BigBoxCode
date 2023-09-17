<?php
// MigrationControl.php

namespace BigBoxCode\DesignPattern\Command\DbMigration;

class MigrationControl {
    private array $executedMigrationList = [];

    public function migrate(Migration $migration) {
        // Check if migration is in the list (already executed)
        if (array_search($migration, $this->executedMigrationList) !== false) {
            return;
        }

        // Call 'up' of the migration
        $migration->up();

        // Add migration to the list
        array_push($this->executedMigrationList, $migration);
    }

    public function rollback(Migration $migration) {
        // Check if migration exist in the list or not
        $migrationKey = array_search($migration, $this->executedMigrationList);
        if ($migrationKey === false) {
            return;
        }

        // Call 'down' of the migration
        $migration->down();

        // Remove migration from list
        unset($this->executedMigrationList[$migrationKey]);
    }
}