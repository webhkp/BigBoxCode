<?php
// HeadElement.php

namespace BigBoxCode\DesignPattern\Visitor\UiElement;

class HeadElement implements UIElement {
    private string $text;
    private string $wrapper = 'h1';

    public function __construct(string $text) {
        $this->text = $text;
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