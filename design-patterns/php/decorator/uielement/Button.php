<?php
// Button.php

namespace BigBoxCode\DesignPattern\Decorator\UiElement;

class Button implements UIElement {
    public function draw(): void {
        echo "Drawing Button\n";
    }
}