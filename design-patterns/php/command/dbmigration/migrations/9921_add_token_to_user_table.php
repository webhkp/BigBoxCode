<?php
// 9921_add_token_to_user_table.php

use BigBoxCode\DesignPattern\Command\DbMigration\Migration;

return new class implements Migration {
    public function up(): void {
        // dummy migration

        echo "Adding Token column from user table\n";

        // put actual migration code here
    }

    public function down(): void {
        // dummy migration

        echo "Dropping Token column from user table\n";

        // put actual migration code here
    }
};