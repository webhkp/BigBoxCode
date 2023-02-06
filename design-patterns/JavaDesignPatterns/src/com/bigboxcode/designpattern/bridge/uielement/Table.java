package com.bigboxcode.designpattern.bridge.uielement;

public class Table extends UIElement{

    public Table(ColorSchema colorSchema) {
        super(colorSchema);
    }

    @Override
    public void printElement() {
        // Write code for printing table element
        System.out.println("Printing Table");

        // Set color schema
        colorSchema.setColor();
    }
}
