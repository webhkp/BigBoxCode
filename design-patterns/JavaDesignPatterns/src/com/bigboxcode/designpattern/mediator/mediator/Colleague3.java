package com.bigboxcode.designpattern.mediator.mediator;

public class Colleague3 extends Colleague {
    public Colleague3(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void sendMessage(Colleague colleague, String msg) {
        mediator.sendMessage(colleague, msg);
    }

    @Override
    public void receiveMessage(String msg) {
        System.out.println("Message received in Colleague3: " + msg);
    }
}