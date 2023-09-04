<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Decorator\DataExport\CsvDataExportDecorator;
use BigBoxCode\DesignPattern\Decorator\DataExport\ExcelDataExportDecorator;
use BigBoxCode\DesignPattern\Decorator\DataExport\JsonDataExportDecorator;
use BigBoxCode\DesignPattern\Decorator\DataExport\SimpleDataExport;

$csvDataExport = new CsvDataExportDecorator(new SimpleDataExport());
$csvDataExport->processData();

$excelDataExport = new ExcelDataExportDecorator(new SimpleDataExport());
$excelDataExport->processData();

$jsonDataExport = new JsonDataExportDecorator(new SimpleDataExport());
$jsonDataExport->processData();