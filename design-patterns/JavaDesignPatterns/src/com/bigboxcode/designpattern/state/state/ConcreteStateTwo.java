// ConcreteStateTwo.java

package com.bigboxcode.designpattern.state.state;

public class ConcreteStateTwo extends State {

    public ConcreteStateTwo(Context context) {
        super(context);
    }

    @Override
    public void actionOne() {
        System.out.println("Calling 'actionOne' of - 'ConcreteStateTwo'");
    }

    @Override
    public void actionTwo() {
        System.out.println("Calling 'actionTwo' of - 'ConcreteStateTwo'");
    }
}
