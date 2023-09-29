<?php
// OrderDeliverState.php

namespace BigBoxCode\DesignPattern\State\Order;


class OrderDeliverState extends OrderState {
    public function __construct(OrderContext $context) {
        parent::__construct($context);
    }

    public function process(): void {
        // Write code to process the order
        echo "Delivering the order\n";

        $this->context->setState($this->context->getOrderReceiveState());
    }
}