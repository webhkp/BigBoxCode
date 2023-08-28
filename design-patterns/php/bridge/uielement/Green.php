<?php
// Green.php

namespace BigBoxCode\DesignPattern\Bridge\UiElement;

class Green implements Color {
    public function setColor(): void {
        echo "Setting proper color for Green color schema\n";
    }
}