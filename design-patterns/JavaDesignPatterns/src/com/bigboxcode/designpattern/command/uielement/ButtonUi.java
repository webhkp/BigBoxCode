package com.bigboxcode.designpattern.command.uielement;

public class ButtonUi implements UiCommand {

    private final String name;

    public ButtonUi(String name) {
        this.name = name;
    }

    @Override
    public void print() {
        System.out.println("Printing " + this.name + " Button");
    }

    @Override
    public void remove() {
        System.out.println("Removing " + this.name + "  Button");
    }
}
