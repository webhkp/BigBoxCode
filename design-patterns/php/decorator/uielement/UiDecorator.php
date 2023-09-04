<?php
// UiDecorator.php

namespace BigBoxCode\DesignPattern\Decorator\UiElement;

abstract class UIDecorator implements UIElement {
    protected function __construct(protected readonly UIElement $uiElement) {
    }

    public function draw(): void {
        $this->uiElement->draw();
    }
}