package com.bigboxcode.designpattern.observer.observer;

public class ObserverOne extends Observer{
    private Subject subject;

    public ObserverOne(Subject subject){
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void sendUpdate() {
        System.out.println( "Received in ObserverOne: " + subject.getState());
    }
}