// ConcreteStateOne.java

package com.bigboxcode.designpattern.state.state;

public class ConcreteStateOne extends State {
    public ConcreteStateOne(Context context) {
        super(context);
    }

    @Override
    public void actionOne() {
        System.out.println("Calling 'actionOne' of - 'ConcreteStateOne'");
    }

    @Override
    public void actionTwo() {
        System.out.println("Calling 'actionTwo' of - 'ConcreteStateOne'");
    }
}
