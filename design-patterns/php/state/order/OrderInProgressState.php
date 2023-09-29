<?php
// OrderInProgressState.php

namespace BigBoxCode\DesignPattern\State\Order;


class OrderInProgressState extends OrderState {
    public function __construct(OrderContext $context) {
        parent::__construct($context);
    }

    public function process(): void {
        // Write code to process the order
        echo "Processing the order\n";

        $this->context->setState($this->context->getOrderDeliverState());
    }
}
