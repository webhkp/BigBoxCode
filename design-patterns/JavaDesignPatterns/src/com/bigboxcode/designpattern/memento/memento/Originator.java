package com.bigboxcode.designpattern.memento.memento;

public class Originator {

    private String state;

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public Memento setMemento() {
        System.out.println("Memento Saved with timestamp => " + state);

        return new Memento(state);
    }

    public void getMementoState(Memento memento) {
        state = memento.getState();
    }
}
