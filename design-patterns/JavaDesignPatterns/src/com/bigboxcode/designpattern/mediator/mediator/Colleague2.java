package com.bigboxcode.designpattern.mediator.mediator;

public class Colleague2 extends Colleague {
    public Colleague2(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void sendMessage(Colleague colleague, String msg) {
        mediator.sendMessage(colleague, msg);
    }

    @Override
    public void receiveMessage(String msg) {
        System.out.println("Message received in Colleague2: " + msg);
    }
}