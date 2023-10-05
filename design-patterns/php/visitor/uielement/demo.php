<?php
// demo.php

require __DIR__ . '/../../vendor/autoload.php';

use BigBoxCode\DesignPattern\Visitor\UiElement\ElementVisitor;
use BigBoxCode\DesignPattern\Visitor\UiElement\HeadElement;
use BigBoxCode\DesignPattern\Visitor\UiElement\ListElement;
use BigBoxCode\DesignPattern\Visitor\UiElement\TextElement;
use BigBoxCode\DesignPattern\Visitor\UiElement\WrapElement;

$uiElements = [
    new HeadElement('My Heading'),
    new TextElement('First line of text'),
    new ListElement(['abc', 'def', 'ghi', 'jkl']),
    new WrapElement('Content wrapped with div', 'div'),
    new TextElement('Last line of text'),
];


$visitor = new ElementVisitor();

foreach ($uiElements as $element) {
    $element->appendElement($visitor);
}

echo $visitor->output;