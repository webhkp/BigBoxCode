<?php
// Table.php

namespace BigBoxCode\DesignPattern\Bridge\UiElement;


class Table extends UIElement {
    public function __construct(Color $color) {
        parent::__construct($color);
    }

    public function printElement(): void {
        $this->color->setColor();

        echo "Printing Table\n";
    }
}
