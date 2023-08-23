<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Singleton\Setting\Setting;

// Create setting instance
$setting = Setting::getInstance();

$setting->set("file_base_path", "/var/log/dd");
$setting->set("app_port", 3000);

var_dump($setting->getAll());

// Try to create another instance
$setting2 = Setting::getInstance();

var_dump($setting2->getAll());