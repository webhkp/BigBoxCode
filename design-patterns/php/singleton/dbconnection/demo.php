<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Singleton\DbConnection\DbConnSingleton;

// Create database instance
$dbConnOne = DbConnSingleton::getInstance('loclahost', 1234, 'root', 'secret!pass');

echo "\nDB connection details for dbConnOne:";
$dbConnOne->printConnectionDetails();

// Try to create another database instance
$dbConnTwo = DbConnSingleton::getInstance('192.168.55.55', 2222, 'root2', 'secret!pass2');

echo "\nDB connection details for dbConnTwo:";
$dbConnTwo->printConnectionDetails();