<?php
// OrderReceiveState.php

namespace BigBoxCode\DesignPattern\State\Order;


class OrderReceiveState extends OrderState {
    public function __construct(OrderContext $context) {
        parent::__construct($context);
    }

    public function process(): void {
        // Write code to process the order
        echo "Order received\n";

        $this->context->setState(null);
    }
}