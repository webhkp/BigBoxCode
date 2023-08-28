<?php
// Red.php

namespace BigBoxCode\DesignPattern\Bridge\UiElement;

class Red implements Color {
    public function setColor(): void {
        echo "Setting proper color for Red color schema\n";
    }
}