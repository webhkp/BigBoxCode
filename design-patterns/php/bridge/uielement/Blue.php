<?php
// Blue.php

namespace BigBoxCode\DesignPattern\Bridge\UiElement;


class Blue implements Color {
    public function setColor(): void {
        echo "Setting proper color for Blue color schema\n";
    }
}
