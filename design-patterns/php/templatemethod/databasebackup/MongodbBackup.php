<?php
// MongodbBackup.php

namespace BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup;

class MongodbBackup extends DatabaseBackup {
    public function __construct(string $location) {
        parent::__construct($location);
    }

    protected function dump(): void {
        // Dump MongoDb database

        // Write specific process
        // for specifically MongoDB DB backup

        echo "Perform steps for MongoDB database dump\n";
    }
}