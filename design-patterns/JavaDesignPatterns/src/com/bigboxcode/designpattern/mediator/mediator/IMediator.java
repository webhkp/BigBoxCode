package com.bigboxcode.designpattern.mediator.mediator;

public interface IMediator {
    void sendMessage(Colleague colleague, String msg);
}
