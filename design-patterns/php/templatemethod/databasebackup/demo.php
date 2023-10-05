<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup\MongodbBackup;
use BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup\MysqlBackup;
use BigBoxCode\DesignPattern\TemplateMethod\DatabaseBackup\SqlserverBackup;


// MySQL Backup
$mysqlBackup = new MySQLBackup("/home/backup/mysql/");
$mysqlBackup->process();

// MongoDB Backup
$mongodbBackup = new MongodbBackup('/home/backup/mongo/');
$mongodbBackup->process();

// SQL Server backup
$sqlserverBackup = new SqlserverBackup("/home/backup/mssql/");
$sqlserverBackup->process();