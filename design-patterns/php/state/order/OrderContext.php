<?php
// OrderContext.php

namespace BigBoxCode\DesignPattern\State\Order;


class OrderContext {
    private ?OrderState $state;
    private OrderState $orderCheckState;
    private OrderState $orderInProgressState;
    private OrderState $orderDeliverState;
    private OrderState $orderReceiveState;

    public function __construct() {
        $this->orderCheckState = new OrderCheckState($this);
        $this->orderInProgressState = new OrderInProgressState($this);
        $this->orderDeliverState = new OrderDeliverState($this);
        $this->orderReceiveState = new OrderReceiveState($this);

        // Set the placed state as default
        $this->state = $this->orderCheckState;
    }

    public function setState(?OrderState $state): void {
        $this->state = $state;
    }

    public function getState(): OrderState|null {
        return $this->state;
    }

    public function getOrderCheckState(): OrderState {
        return $this->orderCheckState;
    }

    public function getOrderInProgressState(): OrderState {
        return $this->orderInProgressState;
    }

    public function getOrderDeliverState(): OrderState {
        return $this->orderDeliverState;
    }

    public function getOrderReceiveState(): OrderState {
        return $this->orderReceiveState;
    }

    public function runNextProcess(): void {
        if ($this->state != null) {
            $this->state->process();
        } else {
            echo "Order processing complete\n";
        }
    }
}