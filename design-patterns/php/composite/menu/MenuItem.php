<?php
// MenuItem.php

namespace BigBoxCode\DesignPattern\Composite\Menu;

class MenuItem implements Menu {
    public function __construct(private string $link, private string $text) {

    }

    public function print(): void {
        echo "[li][a link='" . $this->link . "']" . $this->text . "[/a][/li]\n";
    }
}