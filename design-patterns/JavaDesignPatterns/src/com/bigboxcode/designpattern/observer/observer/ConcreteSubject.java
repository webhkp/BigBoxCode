package com.bigboxcode.designpattern.observer.observer;

import java.util.ArrayList;
import java.util.List;

public class ConcreteSubject implements Subject{

    private int state;

    private List<Observer> observerList = new ArrayList<>();

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;

        notifyObservers();
    }

    public void attach(Observer observer) {
        observerList.add(observer);
    }

    public void notifyObservers() {
        for (Observer observer : observerList) {
            observer.sendUpdate();
        }
    }

}