// State.java

package com.bigboxcode.designpattern.state.state;

public abstract class State {
    protected Context context;

    public State(Context context) {
        this.context = context;

        this.context.setState(this);
    }

    public abstract void actionOne();

    public abstract void actionTwo();
}
