<?php
use BigBoxCode\DesignPattern\Command\DbMigration\FileLoadUtil;
use BigBoxCode\DesignPattern\Command\DbMigration\MigrationControl;

// demo.php

require __DIR__ . '/../../vendor/autoload.php';

// Load migration classes
// These are general operation, not related to the Command pattern implementation
const MIGRATION_FILE_PATH = __DIR__ . "/migrations";
$migrationFileList = scandir(MIGRATION_FILE_PATH, SCANDIR_SORT_ASCENDING);
$migrations = [];

foreach ($migrationFileList as $fileName) {
    $fullPath = MIGRATION_FILE_PATH . "/" . $fileName;

    if (is_file($fullPath)) {
        $migrations[] = require($fullPath);
    }
}
// Migration loading end

// Create a command controller (MigrationControl) object
$migrationController = new MigrationControl();

// Run migration "up" for all migration
foreach ($migrations as $migration) {
    $migrationController->migrate($migration);
}


// Rollback all migrations
$reverseMigration = array_reverse($migrations);

foreach ($reverseMigration as $migration) {
    $migrationController->rollback($migration);
}
