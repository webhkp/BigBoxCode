<?php
// InputUi.php

namespace BigBoxCode\DesignPattern\Command\UiElement;


class InputUi implements UiCommand {
    public function print(): void {
        echo "Printing Input\n";
    }

    public function remove(): void {
        echo "Removing Input\n";
    }
}