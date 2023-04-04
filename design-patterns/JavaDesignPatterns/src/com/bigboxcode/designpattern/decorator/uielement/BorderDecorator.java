// BorderDecorator.java

package com.bigboxcode.designpattern.decorator.uielement;

public class BorderDecorator extends UIDecorator {
    protected BorderDecorator(UIElement uiElement) {
        super(uiElement);
    }

    @Override
    public void draw() {
        // Can perform any additional task anywhere in the method

        super.draw();

        // Write code to add border to the element

        System.out.println("Adding Border to the element");
    }
}
