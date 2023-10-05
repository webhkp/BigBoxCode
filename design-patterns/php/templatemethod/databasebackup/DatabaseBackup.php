<?php
// DatabaseBackup.php

namespace BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup;


abstract class DatabaseBackup {
    public function __construct(protected string $location) {

    }

    // For specific dump process for specif database
    abstract protected function dump(): void;

    private function initialCheck(): void {
        // Perform initial checking
        // Check the last stored version
        // and data of the last saved version

        echo "Perform initial check\n";
    }

    private function validate(): void {
        // Validate the database dump
        // Check if dump is done peroperly
        // and saved in the specified location

        echo "Validate database dump\n";
    }

    private function compress(): void {
        // Compress dump file before saving

        echo "Compress database dump file\n";
    }

    private function version(): void {
        // Set version of the dump file
        // Check the last version saved
        // and set the new version name

        echo "Set the version of the new dump\n";
    }

    private function save(): void {
        // Save database dump

        echo "Save database dump to specific location: {$this->location}\n";
    }

    public function process(): void {
        $this->initialCheck();
        $this->dump();
        $this->validate();
        $this->compress();
        $this->version();
        $this->save();
    }

}