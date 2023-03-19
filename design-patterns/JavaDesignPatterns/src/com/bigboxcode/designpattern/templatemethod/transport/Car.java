// Car.java

package com.bigboxcode.designpattern.templatemethod.transport;

public class Car extends Transport {
    @Override
    void createBody() {
        System.out.println("Creating Car Body");
    }

    @Override
    void addEngine() {
        System.out.println("Adding Engine to Car");
    }

    @Override
    void addWheel() {
        System.out.println("Adding 4 Wheels to Car");
    }

    @Override
    void addWing() {
        // Not required for Car
    }
}