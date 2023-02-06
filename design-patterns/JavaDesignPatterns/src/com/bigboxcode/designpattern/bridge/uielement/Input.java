package com.bigboxcode.designpattern.bridge.uielement;

public class Input extends UIElement{

    public Input(ColorSchema colorSchema) {
        super(colorSchema);
    }

    @Override
    public void printElement() {
        // Write code for printing element
        System.out.println("Printing Input");

        // Set color schema
        colorSchema.setColor();
    }
}
