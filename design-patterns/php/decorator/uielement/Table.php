<?php
// Table.php

namespace BigBoxCode\DesignPattern\Decorator\UiElement;

class Table implements UIElement {
    public function draw(): void {
        echo "Drawing Table\n";
    }
}