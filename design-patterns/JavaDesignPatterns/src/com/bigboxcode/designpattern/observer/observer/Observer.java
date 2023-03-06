package com.bigboxcode.designpattern.observer.observer;

public abstract class Observer {
    protected Subject subject;

    public abstract void sendUpdate();
}
