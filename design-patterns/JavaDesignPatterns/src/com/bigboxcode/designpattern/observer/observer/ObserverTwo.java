package com.bigboxcode.designpattern.observer.observer;

public class ObserverTwo extends Observer{

    public ObserverTwo(Subject subject){
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void sendUpdate() {
        System.out.println( "Received in ObserverTwo: " + subject.getState());
    }
}