<?php
// migrations/2345_create_permission_table.php

use BigBoxCode\DesignPattern\Command\DbMigration\Migration;

return new class implements Migration {
    public function up(): void {
        // dummy migration

        echo "Creating Permission table\n";

        // put actual migration code here
    }

    public function down(): void {
        // dummy migration

        echo "Dropping Permission table\n";

        // put actual migration code here
    }
};