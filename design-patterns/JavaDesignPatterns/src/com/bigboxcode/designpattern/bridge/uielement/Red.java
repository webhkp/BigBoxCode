package com.bigboxcode.designpattern.bridge.uielement;

public class Red implements ColorSchema {
    @Override
    public void setColor() {
        System.out.println("Setting proper color for Red color schema");
    }
}
