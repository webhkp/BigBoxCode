<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Decorator\UiElement\BackgroundDecorator;
use BigBoxCode\DesignPattern\Decorator\UiElement\BorderDecorator;
use BigBoxCode\DesignPattern\Decorator\UiElement\Button;
use BigBoxCode\DesignPattern\Decorator\UiElement\InputBox;
use BigBoxCode\DesignPattern\Decorator\UiElement\MarginDecorator;
use BigBoxCode\DesignPattern\Decorator\UiElement\Table;


$tableWithBorder = new BorderDecorator(new Table());
$tableWithBorder->draw();

$inputWithBorderAndBackground = new BackgroundDecorator(new BorderDecorator(new InputBox()));
$inputWithBorderAndBackground->draw();

$buttonWithAllDecorator = new MarginDecorator(new BackgroundDecorator(new BorderDecorator(new Button())));
$buttonWithAllDecorator->draw();