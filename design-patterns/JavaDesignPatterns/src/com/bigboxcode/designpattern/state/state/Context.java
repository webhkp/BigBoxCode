// Context.java

package com.bigboxcode.designpattern.state.state;

public class Context {
    private State state;

    public void setState(State state) {
        this.state = state;
    }

    public State getState() {
        return state;
    }

    public void performActionOne() {
        this.state.actionOne();
    }


    public void performActionTwo() {
        this.state.actionTwo();
    }
}
