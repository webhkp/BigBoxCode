<?php
// Button.php

namespace BigBoxCode\DesignPattern\Bridge\UiElement;


class Button extends UIElement {
    public function __construct(Color $color) {
        parent::__construct($color);
    }

    public function printElement(): void {
        $this->color->setColor();

        echo "Printing Button\n";
    }
}
