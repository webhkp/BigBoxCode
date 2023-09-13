<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\ChainOfResponsibility\Cache\CdnCacheHandler;
use BigBoxCode\DesignPattern\ChainOfResponsibility\Cache\Data;
use BigBoxCode\DesignPattern\ChainOfResponsibility\Cache\DATA_TYPE;
use BigBoxCode\DesignPattern\ChainOfResponsibility\Cache\DiskCacheHandler;
use BigBoxCode\DesignPattern\ChainOfResponsibility\Cache\RedisCacheHandler;


$cacheHandler = new DiskCacheHandler(new RedisCacheHandler(new CdnCacheHandler(null)));

$data1 = new Data(DATA_TYPE::DATA, "key1", "ABC320489un3429rn29urn29r82n9jfdn2");
$cacheHandler->handleRequest($data1);

$data2 = new Data(DATA_TYPE::CSS, "key2", ".some-class{border: 1px solid red; margin: 10px}");
$cacheHandler->handleRequest($data2);
