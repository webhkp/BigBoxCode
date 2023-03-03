package com.bigboxcode.designpattern.observer.observer;

public interface Subject {

    int getState();

    void setState(int state);

    void attach(Observer observer);

    void notifyObservers();

}