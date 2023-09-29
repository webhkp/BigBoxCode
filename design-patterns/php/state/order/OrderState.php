<?php
// OrderState.php

namespace BigBoxCode\DesignPattern\State\Order;

abstract class OrderState {

    protected OrderContext $context;

    public function __construct(OrderContext $context) {
        $this->context = $context;

        $this->context->setState($this);
    }

    abstract function process(): void;
}
