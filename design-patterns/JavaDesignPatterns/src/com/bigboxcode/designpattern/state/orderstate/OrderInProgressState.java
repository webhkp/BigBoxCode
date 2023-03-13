// OrderInProgressState.java

package com.bigboxcode.designpattern.state.orderstate;

public class OrderInProgressState extends OrderState {
    public OrderInProgressState(OrderContext context) {
        super(context);
    }

    @Override
    public void process() {
        // Write code to process the order
        System.out.println("Processing the order");

        context.setState(context.getOrderDeliveredState());
    }
}