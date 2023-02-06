package com.bigboxcode.designpattern.bridge.uielement;

public class Button extends UIElement{

    public Button(ColorSchema colorSchema) {
        super(colorSchema);
    }

    @Override
    public void printElement() {
        // Write code for printing element
        System.out.println("Printing Button");

        // Set color schema
        colorSchema.setColor();
    }
}
