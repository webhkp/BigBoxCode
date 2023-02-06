package com.bigboxcode.designpattern.command.uielement;

public class TableUi implements UiCommand {
    @Override
    public void print() {
        System.out.println("Printing Table");
    }

    @Override
    public void remove() {
        System.out.println("Removing Table");
    }
}
