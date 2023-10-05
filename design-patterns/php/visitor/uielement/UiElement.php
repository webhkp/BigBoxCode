<?php
// UiElement.php

namespace BigBoxCode\DesignPattern\Visitor\UiElement;

interface UIElement {
    public function appendElement(Visitor $visitor): void;
}