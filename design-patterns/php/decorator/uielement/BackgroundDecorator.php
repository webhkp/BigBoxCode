<?php
// BackgroundDecorator.php

namespace BigBoxCode\DesignPattern\Decorator\UiElement;

class BackgroundDecorator extends UIDecorator {
    public function __construct(UIElement $uiElement) {
        parent::__construct($uiElement);
    }

    public function draw(): void {
        parent::draw();
        
        echo "Adding Background to the element\n";
    }
}