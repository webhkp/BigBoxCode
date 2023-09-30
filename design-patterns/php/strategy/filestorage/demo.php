<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Strategy\FileStorage\GoogleDriveStorage;
use BigBoxCode\DesignPattern\Strategy\FileStorage\LocalStorage;
use BigBoxCode\DesignPattern\Strategy\FileStorage\S3Storage;
use BigBoxCode\DesignPattern\Strategy\FileStorage\StorageStrategy;

// Use Local storage
echo "Using local storage-\n";

$fileStorage = new StorageStrategy(new LocalStorage());
$fileStorage->uploadFile("/some-temp-path");

// Use car
echo "Using AWS S3-\n";

$fileStorage->setStrategy(new S3Storage());
$fileStorage->uploadFile("/some-temp-path");

// Use plane
echo "Using Google Drive-\n";

$fileStorage->setStrategy(new GoogleDriveStorage());
$fileStorage->uploadFile("/some-temp-path");