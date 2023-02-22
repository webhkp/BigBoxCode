package com.bigboxcode.designpattern.mediator.mediator;

public abstract class Colleague {
    protected Mediator mediator;

    public Colleague(Mediator mediator) {
        this.mediator = mediator;
    }

    public abstract void sendMessage(Colleague colleague, String message);

    public abstract void receiveMessage(String message);
}
