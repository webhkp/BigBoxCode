package com.bigboxcode.designpattern.mediator.mediator;

public class Mediator implements IMediator {
    @Override
    public void sendMessage(Colleague receiver, String msg) {
        receiver.receiveMessage(msg);
    }
}