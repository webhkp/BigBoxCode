<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Observer\General\ConcreteSubject;
use BigBoxCode\DesignPattern\Observer\General\ObserverOne;
use BigBoxCode\DesignPattern\Observer\General\ObserverTwo;

$subject = new ConcreteSubject();
new ObserverOne($subject);
new ObserverTwo($subject);


echo "Setting subject value to 10\n";
$subject->setState(10);


echo "Setting subject value to 999\n";
$subject->setState(999);