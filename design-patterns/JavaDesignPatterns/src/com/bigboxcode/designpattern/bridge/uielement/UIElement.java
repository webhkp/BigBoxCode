package com.bigboxcode.designpattern.bridge.uielement;

public abstract class UIElement {

    protected ColorSchema colorSchema;

    public UIElement(ColorSchema colorSchema) {
        this.colorSchema = colorSchema;
    }

    public abstract void printElement();
}
