<?php
// ButtonUi.php

namespace BigBoxCode\DesignPattern\Command\UiElement;

class ButtonUi implements UiCommand {
    public function __construct(private string $name) {
    }

    public function print(): void {
        echo "Printing " . $this->name . " Button\n";
    }

    public function remove(): void {
        echo "Removing " . $this->name . "  Button\n";
    }
}