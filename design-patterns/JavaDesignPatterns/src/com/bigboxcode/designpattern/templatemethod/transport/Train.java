// Train.java

package com.bigboxcode.designpattern.templatemethod.transport;

public class Train extends Transport {
    @Override
    void createBody() {
        System.out.println("Creating Train Body");
    }

    @Override
    void addEngine() {
        System.out.println("Adding Engine to Train");
    }

    @Override
    void addWheel() {
        System.out.println("Adding Wheels to Train");
    }

    @Override
    void addWing() {
        // Not required for Train
    }
}
