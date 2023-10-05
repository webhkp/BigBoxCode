<?php
// TextElement.php

namespace BigBoxCode\DesignPattern\Visitor\UiElement;

class TextElement implements UIElement {
    private string $text;

    public function __construct(string $text) {
        $this->text = $text;
    }

    public function getText(): string {
        return $this->text;
    }

    public function appendElement(Visitor $visitor): void {
        $visitor->appendContent($this);
    }
}