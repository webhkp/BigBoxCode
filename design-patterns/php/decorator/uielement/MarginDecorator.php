<?php
// MarginDecorator.php

namespace BigBoxCode\DesignPattern\Decorator\UiElement;

class MarginDecorator extends UIDecorator {
    public function __construct(UIElement $uiElement) {
        parent::__construct($uiElement);
    }

    public function draw(): void {
        parent::draw();
        
        echo "Adding margin to the element\n";
    }
}