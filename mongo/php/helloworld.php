<?php
require_once __DIR__ . '/vendor/autoload.php';

$uri = 'mongodb://bigboxuser:bigboxpass@127.0.0.1:27017';

$client = new MongoDB\Client($uri);

$testCollection = $client->selectDatabase('bigboxcode')->selectCollection('mytest');

$insertResult = $testCollection->insertOne([
    "siteName" => "BigBoxCode",
    "siteURL" => "https://bigboxcode.com",
    "info" => [
        "status" => "active",
        "whois" => "whois.bigboxcode.com",
    ],
]);

