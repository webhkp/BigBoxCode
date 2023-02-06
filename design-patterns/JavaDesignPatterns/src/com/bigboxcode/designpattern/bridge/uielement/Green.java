package com.bigboxcode.designpattern.bridge.uielement;

public class Green implements ColorSchema {
    @Override
    public void setColor() {
        System.out.println("Setting proper color for Green color schema");
    }
}