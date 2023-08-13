<?php
// demo.php

require_once "Request.php";
require_once "Builder.php";

use Builder\Request\Request;
use Builder\Request\RequestType;

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
