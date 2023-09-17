<?php
// Migration.php

namespace BigBoxCode\DesignPattern\Command\DbMigration;


interface Migration {
    function up(): void;
    function down(): void;
}