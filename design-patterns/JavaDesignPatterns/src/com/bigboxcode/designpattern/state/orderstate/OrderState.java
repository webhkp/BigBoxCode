// OrderState.java

package com.bigboxcode.designpattern.state.orderstate;

public abstract class OrderState {

    protected OrderContext context;

    public OrderState(OrderContext context) {
        this.context = context;

        this.context.setState(this);
    }

    public abstract void process();
}
