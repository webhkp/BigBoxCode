<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Proxy\SimpleProxy\Proxy;

$proxy = new Proxy();
$proxy->operation1();
$proxy->operation2();