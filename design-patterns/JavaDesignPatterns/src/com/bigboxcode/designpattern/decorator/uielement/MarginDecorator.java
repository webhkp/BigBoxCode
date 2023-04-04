// MarginDecorator.java

package com.bigboxcode.designpattern.decorator.uielement;

public class MarginDecorator extends UIDecorator {
    protected MarginDecorator(UIElement uiElement) {
        super(uiElement);
    }

    @Override
    public void draw() {
        // Can perform any additional task anywhere in the method

        super.draw();

        // Write code to add margin to the element

        System.out.println("Adding margin to the element");
    }
}