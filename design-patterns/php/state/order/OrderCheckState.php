<?php
// OrderCheckState.php

namespace BigBoxCode\DesignPattern\State\Order;


class OrderCheckState extends OrderState {
    public function __construct(OrderContext $context) {
        parent::__construct($context);
    }

    public function process(): void {
        // Write code to process the order
        echo "Checking the order validity and other information\n";

        $this->context->setState($this->context->getOrderInProgressState());
    }
}