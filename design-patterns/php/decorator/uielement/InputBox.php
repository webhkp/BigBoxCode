<?php
// InputBox.php

namespace BigBoxCode\DesignPattern\Decorator\UiElement;

class InputBox implements UIElement {
    public function draw(): void {
        echo "Drawing Input Box\n";
    }
}