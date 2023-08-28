<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Bridge\UiElement\Blue;
use BigBoxCode\DesignPattern\Bridge\UiElement\Button;
use BigBoxCode\DesignPattern\Bridge\UiElement\Green;
use BigBoxCode\DesignPattern\Bridge\UiElement\Input;
use BigBoxCode\DesignPattern\Bridge\UiElement\Red;
use BigBoxCode\DesignPattern\Bridge\UiElement\Table;

$table = new Table(new Red());
$table->printElement();

$input = new Input(new Green());
$input->printElement();

$button = new Button(new Blue());
$button->printElement();

$button2 = new Button(new Red());
$button2->printElement();