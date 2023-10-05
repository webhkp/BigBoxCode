<?php
// WrapElement.php

namespace BigBoxCode\DesignPattern\Visitor\UiElement;

class WrapElement implements UIElement {
    private string $text;
    private string $wrapper;

    public function __construct(string $text, string $wrapper) {
        $this->text = $text;
        $this->wrapper = $wrapper;
    }

    public function getText(): string {
        return $this->text;
    }

    public function getWrapper(): string {
        return $this->wrapper;
    }

    public function appendElement(Visitor $visitor): void {
        $visitor->appendContentWithWrapper($this);
    }
}