<?php
// BorderDecorator.php

namespace BigBoxCode\DesignPattern\Decorator\UiElement;

class BorderDecorator extends UIDecorator {
    public function __construct(UIElement $uiElement) {
        parent::__construct($uiElement);
    }

    public function draw(): void {
        parent::draw();

        echo "Adding Border to the element\n";
    }
}