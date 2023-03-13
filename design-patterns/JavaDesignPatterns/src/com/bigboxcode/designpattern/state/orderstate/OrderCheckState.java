// OrderCheckState.java

package com.bigboxcode.designpattern.state.orderstate;

public class OrderCheckState extends OrderState {
    public OrderCheckState(OrderContext context) {
        super(context);
    }

    @Override
    public void process() {
        // Write code to process the order
        System.out.println("Checking the order validity and other information");

        context.setState(context.getOrderInProgressState());
    }
}
