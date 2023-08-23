<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Builder\Request\Request;
use BigBoxCode\DesignPattern\Builder\Request\RequestType;


$request = Request::newBuilder()
    ->url("https://bigboxcode.com/request-test")
    ->type(RequestType::POST)
    ->header("X-AUTH-TOKEN", "someTokenHere")
    ->header("X-SOME-HEADER", "someRandomHeaderValueHere")
    ->body("unit_id", "99")
    ->body("code", "88C3ABK")
    ->build();

// Send request
$request->send();