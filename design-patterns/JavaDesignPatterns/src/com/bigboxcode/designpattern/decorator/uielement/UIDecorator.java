// UIDecorator.java

package com.bigboxcode.designpattern.decorator.uielement;

public abstract class UIDecorator implements UIElement {
    protected final UIElement uiElement;

    protected UIDecorator(UIElement uiElement) {
        this.uiElement = uiElement;
    }

    @Override
    public void draw() {
        this.uiElement.draw();
    }
}
