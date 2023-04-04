// Button.java

package com.bigboxcode.designpattern.decorator.uielement;

public class Button implements UIElement {
    @Override
    public void draw() {
        System.out.println("Drawing Button");
    }
}
