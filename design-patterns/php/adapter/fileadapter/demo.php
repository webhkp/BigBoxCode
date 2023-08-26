<?php
// demo.php
require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Adapter\FileAdapter\FileAdapter;
use BigBoxCode\DesignPattern\Adapter\FileAdapter\FileOperation;
use BigBoxCode\DesignPattern\Adapter\FileAdapter\ThirdPartyApi;

// make a call to third part API for testing
$thirdPartyApi = new ThirdPartyApi();
$thirdPartyApi->fetchData();
$thirdPartyApi->sendData("1234");


// Make a call to the file via FileAdapter
$file = new FileOperation();
$fileAdapter = new FileAdapter($file);
$fileAdapter->fetchData();
$fileAdapter->sendData("ABCDEF");