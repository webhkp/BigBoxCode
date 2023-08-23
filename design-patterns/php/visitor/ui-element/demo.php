<?php
// demo.php

interface UIElement {
    public function appendElement(Visitor $visitor): void;
}

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

interface Visitor {
    public function appendContent(TextElement $textElement): void;
    public function appendContentWithWrapper(WrapElement | HeadElement $wrapElement): void;
    public function appendList(ListElement $listElement): void;
}

class ElementVisitor implements Visitor {
    public string $output = '';

    public function appendContent(TextElement $textElement): void {
        $this->output .= $textElement->getText();
    }

    public function appendContentWithWrapper(WrapElement | HeadElement $wrapElement): void {
        $this->output .= "[" . $wrapElement->getWrapper() . "] " . $wrapElement->getText() . " [/" . $wrapElement->getWrapper() . "]";
    }

    public function appendList(ListElement $listElement): void {
        $this->output .= '[ul]';

        foreach ($listElement->getListItems() as $listItem) {
            $this->output .= "[li] $listItem [/li]";
        }

        $this->output .= '[/ul]';
    }
}

$uiElements = [
    new HeadElement('My Heading'),
    new TextElement('First line of text'),
    new ListElement(['abc', 'def', 'ghi', 'jkl']),
    new WrapElement('Content wrapped with div', 'div'),
    new TextElement('Last line of text'),
];

$visitor = new ElementVisitor();

foreach ($uiElements as $element) {
    $element->appendElement($visitor);
}

echo $visitor->output;

