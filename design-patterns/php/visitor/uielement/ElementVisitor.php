<?php
// ElementVisitor.php

namespace BigBoxCode\DesignPattern\Visitor\UiElement;

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