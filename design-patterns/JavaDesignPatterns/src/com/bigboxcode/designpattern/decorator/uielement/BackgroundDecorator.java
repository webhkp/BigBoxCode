// BackgroundDecorator.java

package com.bigboxcode.designpattern.decorator.uielement;

public class BackgroundDecorator extends UIDecorator {
    protected BackgroundDecorator(UIElement uiElement) {
        super(uiElement);
    }

    @Override
    public void draw() {
        // Can perform any additional task anywhere in the method

        super.draw();

        // Write code to add background to the element

        System.out.println("Adding Background to the element");
    }
}
