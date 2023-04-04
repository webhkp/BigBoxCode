// Demo.java

package com.bigboxcode.designpattern.decorator.uielement;

public class Demo {
    public static void main(String[] args) {
        // Draw table and add border
        UIElement tableWithBorder = new BorderDecorator(new Table());
        tableWithBorder.draw();

        // Draw input with background and border
        UIElement inputWithBorderAndBackground = new BackgroundDecorator(new BorderDecorator(new InputBox()));
        inputWithBorderAndBackground.draw();

        // Draw button with marin, background and border
        UIElement buttonWithAllDecorator = new MarginDecorator(new BackgroundDecorator(new BorderDecorator(new Button())));
        buttonWithAllDecorator.draw();
    }
}
