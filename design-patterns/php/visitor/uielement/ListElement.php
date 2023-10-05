<?php
// ListElement.php

namespace BigBoxCode\DesignPattern\Visitor\UiElement;

class ListElement implements UIElement {
    private array $lines;

    public function __construct(array $lines) {
        $this->lines = $lines;
    }

    public function getListItems(): array {
        return $this->lines;
    }

    public function appendElement(Visitor $visitor): void {
        $visitor->appendList($this);
    }
}