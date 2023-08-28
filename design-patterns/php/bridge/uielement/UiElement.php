<?php
// UiElement.php

namespace BigBoxCode\DesignPattern\Bridge\UiElement;

abstract class UIElement {
    protected Color $color;

    public function __construct(Color $color) {
        $this->color = $color;
    }

    abstract function printElement(): void;
}
