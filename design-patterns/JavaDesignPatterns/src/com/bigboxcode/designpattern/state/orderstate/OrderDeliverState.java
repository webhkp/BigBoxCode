// OrderDeliverState.java

package com.bigboxcode.designpattern.state.orderstate;

public class OrderDeliverState extends OrderState {
    public OrderDeliverState(OrderContext context) {
        super(context);
    }

    @Override
    public void process() {
        // Write code to process the order
        System.out.println("Delivering the order");

        context.setState(context.getOrderReceiveState());
    }
}