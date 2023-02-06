package com.bigboxcode.designpattern.bridge.uielement;

public class Blue implements ColorSchema {
    @Override
    public void setColor() {
        System.out.println("Setting proper color for Blue color schema");
    }
}
