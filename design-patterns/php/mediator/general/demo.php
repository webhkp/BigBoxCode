<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Mediator\General\Colleague1;
use BigBoxCode\DesignPattern\Mediator\General\Colleague2;
use BigBoxCode\DesignPattern\Mediator\General\Colleague3;
use BigBoxCode\DesignPattern\Mediator\General\Mediator;


$mediator = new Mediator();

// Set mediator and create colleague objects
$colleague1 = new Colleague1($mediator);
$colleague2 = new Colleague2($mediator);
$colleague3 = new Colleague3($mediator);

// Send message from colleague 1 to 2
$colleague1->sendMessage($colleague2, "message from colleague1");

// Send message from colleague 1 to 3
$colleague1->sendMessage($colleague3, "message from colleague1");

// Send message from colleague 2 to 3
$colleague2->sendMessage($colleague3, "message from colleague2");

// Send message from Colleague 3 to 1
$colleague3->sendMessage($colleague1, "message from colleague3");