<?php
// Visitor.php

namespace BigBoxCode\DesignPattern\Visitor\UiElement;


interface Visitor {
    public function appendContent(TextElement $textElement): void;
    public function appendContentWithWrapper(WrapElement | HeadElement $wrapElement): void;
    public function appendList(ListElement $listElement): void;
}