// OrderReceiveState.java

package com.bigboxcode.designpattern.state.orderstate;

public class OrderReceiveState extends OrderState {
    public OrderReceiveState(OrderContext context) {
        super(context);
    }

    @Override
    public void process() {
        // Write code to process the order
        System.out.println("Order received");

        context.setState(null);
    }
}