<?php
// migrations/1234_create_user_table.php

use BigBoxCode\DesignPattern\Command\DbMigration\Migration;

return new class implements Migration {
    public function up(): void {
        // dummy migration
        echo "Creating User table\n";

        // put actual migration code here
    }

    public function down(): void {
        // dummy migration

        echo "Dropping User table\n";

        // put actual migration code here
    }
};