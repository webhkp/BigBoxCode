// OrderContext.java

package com.bigboxcode.designpattern.state.orderstate;

public class OrderContext {
    private OrderState state;
    private OrderState orderPlacedState;
    private OrderState orderInProgressState;
    private OrderState orderDeliveredState;
    private OrderState orderReceivedState;

    public OrderContext() {
        orderPlacedState = new OrderCheckState(this);
        orderInProgressState = new OrderInProgressState(this);
        orderDeliveredState = new OrderDeliverState(this);
        orderReceivedState = new OrderReceiveState(this);

        // Set the placed state as default
        state = orderPlacedState;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public OrderState getState() {
        return state;
    }

    public OrderState getOrderPlacedState() {
        return orderPlacedState;
    }

    public OrderState getOrderInProgressState() {
        return orderInProgressState;
    }

    public OrderState getOrderDeliveredState() {
        return orderDeliveredState;
    }

    public OrderState getOrderReceivedState() {
        return orderReceivedState;
    }

    public void runNextProcess() {
        if (state != null) {
            state.process();
        } else {
            System.out.println("Order processing complete");
        }
    }
}
