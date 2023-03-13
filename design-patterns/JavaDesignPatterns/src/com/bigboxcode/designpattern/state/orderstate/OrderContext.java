// OrderContext.java

package com.bigboxcode.designpattern.state.orderstate;

public class OrderContext {
    private OrderState state;
    private OrderState orderCheckState;
    private OrderState orderInProgressState;
    private OrderState orderDeliverState;
    private OrderState orderReceiveState;

    public OrderContext() {
        orderCheckState = new OrderCheckState(this);
        orderInProgressState = new OrderInProgressState(this);
        orderDeliverState = new OrderDeliverState(this);
        orderReceiveState = new OrderReceiveState(this);

        // Set the placed state as default
        state = orderCheckState;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public OrderState getState() {
        return state;
    }

    public OrderState getOrderCheckState() {
        return orderCheckState;
    }

    public OrderState getOrderInProgressState() {
        return orderInProgressState;
    }

    public OrderState getOrderDeliverState() {
        return orderDeliverState;
    }

    public OrderState getOrderReceiveState() {
        return orderReceiveState;
    }

    public void runNextProcess() {
        if (state != null) {
            state.process();
        } else {
            System.out.println("Order processing complete");
        }
    }
}
