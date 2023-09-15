<?php
// TableUi.php

namespace BigBoxCode\DesignPattern\Command\UiElement;


class TableUi implements UiCommand {
    public function print(): void {
        echo "Printing Table\n";
    }

    public function remove(): void {
        echo "Removing Table\n";
    }
}