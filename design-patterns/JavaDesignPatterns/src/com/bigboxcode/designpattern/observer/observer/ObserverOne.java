package com.bigboxcode.designpattern.observer.observer;

public class ObserverOne extends Observer{

    public ObserverOne(Subject subject){
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void sendUpdate() {
        System.out.println( "Received in ObserverOne: " + subject.getState());
    }
}