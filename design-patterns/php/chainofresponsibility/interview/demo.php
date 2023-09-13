<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\ChainOfResponsibility\Interview\CeoInterview;
use BigBoxCode\DesignPattern\ChainOfResponsibility\Interview\HrInterview;
use BigBoxCode\DesignPattern\ChainOfResponsibility\Interview\PhoneInterview;
use BigBoxCode\DesignPattern\ChainOfResponsibility\Interview\TechnicalInterview;

$interviews = new PhoneInterview(new TechnicalInterview(new HrInterview(new CeoInterview(null))));

$interviews->execute();