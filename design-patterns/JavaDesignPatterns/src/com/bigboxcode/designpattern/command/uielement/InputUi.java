package com.bigboxcode.designpattern.command.uielement;

public class InputUi implements UiCommand {
    @Override
    public void print() {
        System.out.println("Printing Input");
    }

    @Override
    public void remove() {
        System.out.println("Removing Input");
    }
}
